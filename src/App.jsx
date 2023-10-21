import { useState } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';

function App() {
  const [restart, setRestart] = useState(false);
  const [key, setKey] = useState({});

  const restartGame = () => {
    setRestart(true);
  };
  const handleGameRestart = () => {
    setRestart(false);
  };

  const handleKeyboardClick = (key) => {
    setKey({ value: key });
  };

  return (
    <div className='min-h-screen w-full bg-primary'>
      <Header onRestart={restartGame} />
      <main className='mx-auto flex w-full max-w-[500px] flex-col place-content-center'>
        <Board
          gameRestart={restart}
          onGameRestart={handleGameRestart}
          keyPressed={key}
        />
        <Keyboard onKeyboardClick={handleKeyboardClick} />
      </main>
    </div>
  );
}

export default App;
