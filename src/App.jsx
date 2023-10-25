import { useState } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Modal from './components/Modal';
import Toast from './components/Toast';

function App() {
  const [restart, setRestart] = useState(false);
  const [key, setKey] = useState({});
  const [keyStatus, setKeyStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);

  const handleAlertMessage = (message) => {
    setAlertMessage((prevAlertMessage) => {
      const newAlertMessage = [...prevAlertMessage];
      newAlertMessage.push({ message: message });
      return newAlertMessage;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const restartGame = () => {
    setKeyStatus([]);
    setRestart(true);
  };
  const handleGameRestart = () => {
    setRestart(false);
  };

  const handleKeyStatus = (keyStatus) => {
    setKeyStatus((prevKeyStatus) => {
      const newKeyStatus = [...prevKeyStatus];
      newKeyStatus.push(keyStatus);
      return newKeyStatus;
    });
  };

  const handleKeyboardClick = async (key) => {
    setKey({ value: key });
  };

  return (
    <div className='min-h-screen w-full bg-primary'>
      <Header onModalOpen={openModal} onRestart={restartGame} />
      <main className='mx-auto flex w-full max-w-[500px] flex-col place-content-center'>
        <Board
          onModalOpen={isModalOpen}
          gameRestart={restart}
          onGameRestart={handleGameRestart}
          keyPressed={key}
          onKeyStatus={handleKeyStatus}
          onAlertMessage={handleAlertMessage}
        />
        <Keyboard onKeyboardClick={handleKeyboardClick} keyStatus={keyStatus} />
        <Toast alerts={alertMessage} setAlerts={setAlertMessage} />
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
