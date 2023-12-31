import { memo } from 'react';

const Header = memo(function Header({ onModalOpen, onRestart }) {
  const handleRestartClick = (e) => {
    onRestart();
    // Remove focus from the button after clicking it
    e.currentTarget.blur();
  };
  return (
    <header className="relative flex h-16 items-center justify-center border-b-[1px] border-b-main-gray bg-primary drop-shadow">
      <h1 className="font-berkshire text-4xl text-white">Wordev</h1>
      <div className="absolute right-0 flex items-center justify-center gap-4">
        <a
          href="https://github.com/dngtnv/wordev-game"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 text-main-light-orange hover:text-main-orange"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
          </svg>
        </a>
        <button
          onClick={onModalOpen}
          className="text-main-light-orange hover:text-main-orange"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>
        <button
          onClick={handleRestartClick}
          className="mr-5 rounded-2xl border-b-4 border-orange-700 bg-orange-500 px-4 py-2 font-bold text-white hover:border-orange-500 hover:bg-orange-400"
        >
          Restart Game
        </button>
      </div>
    </header>
  );
});

export default Header;
