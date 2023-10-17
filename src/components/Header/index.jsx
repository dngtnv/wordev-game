const Header = ({ onRestart }) => {
  const handleRestartClick = (e) => {
    onRestart();
    // Remove focus from the button after clicking it
    e.currentTarget.blur();
  }
  return (
    <header className='relative flex h-16 items-center justify-center border-b-[1px] border-b-main-gray bg-primary drop-shadow'>
      <h1 className='text-3xl font-bold text-white'>Wordev</h1>
      <div className='absolute right-0 flex items-center justify-center gap-4'>
        <button className='text-main-light-orange'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-7 w-7'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
            />
          </svg>
        </button>
        <button
          onClick={handleRestartClick}
          className='mr-5 rounded-2xl border-b-4 border-orange-700 bg-orange-500 px-4 py-2 font-bold text-white hover:border-orange-500 hover:bg-orange-400'
        >
          Restart game
        </button>
      </div>
    </header>
  );
};

export default Header;
