import { useCallback, useEffect, useState } from 'react';
import wordList from '../../assets/wordList';

const Board = ({ gameRestart, onGameRestart, keyPressed, onKeyStatus }) => {
  const [board, setBoard] = useState(
    Array(6)
      .fill()
      .map(() => Array(5).fill('')),
  );
  const getSecretWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex].toUpperCase();
  }, []);
  const easterEgg = 'TOKYO';
  const [secretWord, setSecretWord] = useState(getSecretWord());
  const [isWinner, setIsWinner] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const tileLabels = ['1st', '2nd', '3rd', '4th', '5th'];
  const [tileStates, setTileStates] = useState(
    Array(6)
      .fill()
      .map(() => Array(5).fill('empty')),
  );

  const resetGame = useCallback(() => {
    setBoard(
      Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    );
    setTileStates(
      Array(6)
        .fill()
        .map(() => Array(5).fill('empty')),
    );
    setSecretWord(getSecretWord());
    setIsWinner(false);
    setCurrentRow(0);
    setCurrentCol(0);
    onGameRestart();
  }, [onGameRestart, getSecretWord]);

  const isLetter = (letter) => {
    return /^[a-z]$/i.test(letter);
  };

  const addLetter = useCallback(
    (letter) => {
      if (currentCol === 5 || currentRow === 6) return;
      const pressedLetter = letter.toUpperCase();
      // handle the pressed letter
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[currentRow][currentCol] = pressedLetter;
        return newBoard;
      });
      // Move the cursor right if not at the last column
      setCurrentCol((prevCol) => prevCol + 1);
    },
    [currentCol, currentRow],
  );

  const removeLetter = useCallback(() => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[currentRow][currentCol - 1] = '';
      return newBoard;
    });
    // Move the cursor left if not at the first column
    setCurrentCol((prevCol) => prevCol - 1);
  }, [currentCol, currentRow]);

  const getGuessWord = useCallback(() => {
    return board[currentRow].reduce((acc, curr) => acc + curr, '');
  }, [board, currentRow]);

  const isValidWord = useCallback((word) => {
    return wordList.includes(word.toLowerCase());
  }, []);

  const revealWord = useCallback(
    (guessWord) => {
      const animationDuration = 300; // ms
      const removeAnimationDelay = () => {
        const tiles = document.querySelectorAll(
          `[aria-label="Row ${currentRow + 1
          }"] > div > div[style*="animation-delay"]`,
        );
        tiles.forEach((tile) => {
          tile.style.animationDelay = null;
        });
      };

      if (!isValidWord(guessWord) || guessWord.length !== 5) {
        const row = document.querySelector(
          `[aria-label="Row ${currentRow + 1}"]`,
        );
        row.classList.add('animate-shake');
        setTimeout(() => {
          row.classList.remove('animate-shake');
        }, 600);
        return;
      }

      const processTile = async (tile, letter, index) => {
        const newTileStates = [...tileStates];
        setTimeout(
          () => {
            // newTileStates[currentRow][index] =
            //   letter === secretWord[index]
            //     ? 'correct'
            //     : secretWord.includes(letter)
            //       ? 'present'
            //       : 'absent';
            if (letter === secretWord[index]) {
              newTileStates[currentRow][index] = 'correct';
              tile.classList.add('bg-main-green');
            } else if (secretWord.includes(letter)) {
              newTileStates[currentRow][index] = 'present';
              tile.classList.add('bg-main-yellow');
            } else {
              newTileStates[currentRow][index] = 'absent';
              tile.classList.add('bg-main-gray');
            }
            setTileStates(newTileStates);
            tile.classList.remove('border-2');
          },
          (index + 1) * animationDuration,
        );
        tile.classList.remove('animate-pop');
        tile.classList.add('animate-flip');
        tile.style.animationDelay = `${index * animationDuration}ms`;

        // Simulate asynchronous operation using setTimeout
        await new Promise((resolve) =>
          setTimeout(resolve, 5 * animationDuration),
        );
        // store the letter with its status
        onKeyStatus({
          letter,
          status: tileStates[currentRow][index],
        });
      };

      for (let i = 0; i < 5; i++) {
        const tile = document.querySelector(
          `[aria-label="Row ${currentRow + 1}"] > div:nth-child(${i + 1
          }) > div`,
        );
        const letter = tile.textContent;
        processTile(tile, letter, i);
      }

      setTimeout(() => {
        setCurrentRow((prevRow) => prevRow + 1);
        setCurrentCol(0);

        const bingo = secretWord === guessWord || guessWord === easterEgg;
        const isLoser = currentRow === 5 && !bingo;

        removeAnimationDelay();

        if (bingo) {
          for (let i = 0; i < 5; i++) {
            const tile = document.querySelector(
              `[aria-label="Row ${currentRow + 1}"] > div:nth-child(${i + 1
              }) > div`,
            );
            tile.classList.remove('animate-flip');
            tile.classList.add('animate-jump');
            tile.style.animationDelay = `${i * 100}ms`;
          }
          setIsWinner(true);
        }
        if (isLoser) {
          console.log('You lose! secret word is: ', secretWord);
        }
      }, 1700);
    },
    [currentRow, isValidWord, secretWord, tileStates],
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (isWinner) return;
      if (e.repeat) return;
      if (e.key === 'Backspace') {
        if (currentCol === 0) return;
        removeLetter();
      }
      if (e.key === 'Enter') {
        const guess = getGuessWord();
        revealWord(guess);
      }
      // check if the pressed key is a letter (a-z)
      if (isLetter(e.key)) {
        addLetter(e.key);
      }
    },
    [currentCol, revealWord, getGuessWord, addLetter, isWinner, removeLetter],
  );

  const handleKeyboardPress = useCallback(() => {
    if (isWinner) return;
    const { value } = keyPressed;
    if (value === 'Backspace') {
      if (currentCol === 0) return;
      removeLetter();
    }
    if (value === 'Enter') {
      const guess = getGuessWord();
      revealWord(guess);
    }
    if (isLetter(value)) {
      addLetter(value);
    }
  }, [keyPressed]);

  useEffect(() => {
    if (gameRestart) {
      resetGame();
    }
  }, [gameRestart, resetGame]);

  useEffect(() => {
    handleKeyboardPress();
  }, [handleKeyboardPress]);

  useEffect(() => {
    const listener = (e) => handleKeyPress(e);
    window.addEventListener('keydown', listener);
    // Clean up all event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [handleKeyPress, currentCol, currentRow]);

  return (
    <section className='flex items-center justify-center'>
      <div className='grid h-[360px] w-[300px] grid-rows-6 gap-[5px] p-[10px]'>
        {board.map((row, i) => (
          <div
            className='grid grid-cols-5 gap-[5px]'
            key={i}
            aria-label={`Row ${i + 1}`}
          >
            {row.map((letter, j) => (
              <div className='bg-primary' key={j}>
                <div
                  className={`inline-flex h-full w-full select-none items-center justify-center border-2 border-main-gray align-middle text-[2rem] font-bold uppercase leading-[1] text-white ${letter !== '' ? 'animate-pop border-main-light-gray' : ''
                    }`}
                  aria-label={`${tileLabels[j]} letter, ${letter === '' ? '' : letter
                    }, ${tileStates[i][j]}`}
                  data-state={tileStates[i][j]}
                >
                  {letter}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Board;
