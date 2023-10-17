import { useState } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';

function App() {
  const [restart, setRestart] = useState(false);

  const restartGame = () => {
    setRestart(true);
  };
  const handleGameRestart = () => {
    setRestart(false);
  };

  return (
    <div className='min-h-screen w-full bg-primary'>
      <Header onRestart={restartGame} />
      <main className='flex flex-col place-content-center'>
        <Board gameRestart={restart} onGameRestart={handleGameRestart} />
        <Keyboard />
      </main>
    </div>
  );
}

export default App;
