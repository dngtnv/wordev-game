const Modal = ({ isOpen, onClose }) => {
  const modalClasses = isOpen ? "block" : "hidden";
  const modalAnimation = isOpen ? "animate-slideIn" : "animate-slideOut";

  return (
    <div
      className={`${modalClasses} fixed inset-0 z-50 flex items-center justify-center text-white`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 z-[-1] bg-black opacity-50"
      ></div>
      <div
        className={`${modalAnimation} max-w-[520px] rounded bg-primary p-6 shadow-lg`}
      >
        <div className="flex justify-end">
          <button
            className="text-white hover:text-main-light-orange"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z" />
            </svg>
          </button>
        </div>
        <div>
          <h2 className="font-berkshire text-3xl">About This Game</h2>
          <p className="mb-2 text-[18px] text-main-red">
            A programming and development-themed version of the Wordle.
          </p>
          <p className="text-[18px] text-main-purple">
            Challenge your mind and expand your programming vocabulary as you
            attempt to guess the secret code. Think strategically, consider
            programming languages, algorithms, and software-related terms.
          </p>
          <h2 className="mb-2 mt-5 font-berkshire text-3xl">How To Play</h2>
          <p className="mb-2 text-[18px]">Guess the Wordle in 6 tries.</p>
          <ul className="list-inside list-disc text-[18px]">
            <li className="mb-2 text-main-light-orange">
              Each guess must be a valid 5-letter word.
            </li>
            <li className="mb-2 text-main-green">
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
            <li className="mb-2 text-main-yellow">
              And do not forget that we have an Easter Egg word 😎 It will be
              fun.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
