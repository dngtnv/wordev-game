import { memo, useEffect, useState } from 'react';

const bpSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
    />
  </svg>
);
const firstLayerKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const secondLayerKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const thirdLayerKeys = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', bpSvg];

const Keyboard = memo(function Keyboard({ onKeyboardClick, keyStatus }) {
  const [buttonStyles, setButtonStyles] = useState({});

  const onKeyboardClickHandler = (e) => {
    if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
      const btn = e.target.closest('button').getAttribute('data-key');
      onKeyboardClick(btn);
    } else {
      onKeyboardClick(e.target.getAttribute('data-key'));
    }
    e.currentTarget.blur();
  };

  const getKeyStatus = (key, keyArr) => {
    const foundKey = keyArr.find((item) => item.letter.toLowerCase() === key);
    if (foundKey && foundKey.status) {
      return foundKey.status;
    }
    return foundKey ? foundKey.status : 'bg-main-blue'; // Assuming default className for buttons with no status
  };

  useEffect(() => {
    // Update button styles whenever keyStatus changes
    const updatedButtonStyles = {};
    [...firstLayerKeys, ...secondLayerKeys, ...thirdLayerKeys].forEach(
      (key) => {
        updatedButtonStyles[key] = getKeyStatus(key, keyStatus);
      },
    );
    setButtonStyles(updatedButtonStyles);
  }, [keyStatus]);

  return (
    <section className="flex h-[200px] select-none flex-col items-center text-white">
      <div className="mb-2 flex w-full gap-[6px]">
        {firstLayerKeys.map((key, index) => (
          <button
            key={index}
            className={`${
              buttonStyles[key] === 'absent'
                ? 'bg-main-gray'
                : buttonStyles[key] === 'present'
                ? 'bg-main-yellow'
                : buttonStyles[key] === 'correct'
                ? 'bg-main-green'
                : 'bg-main-blue'
            } flex h-[58px] flex-1 items-center justify-center rounded-lg text-[1.25em] font-bold uppercase`}
            data-key={key}
            onClick={onKeyboardClickHandler}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="mb-2 flex w-[90%] gap-[6px]">
        {secondLayerKeys.map((key, index) => (
          <button
            key={index}
            className={`${
              buttonStyles[key] === 'absent'
                ? 'bg-main-gray'
                : buttonStyles[key] === 'present'
                ? 'bg-main-yellow'
                : buttonStyles[key] === 'correct'
                ? 'bg-main-green'
                : 'bg-main-blue'
            } flex h-[58px] flex-1 items-center justify-center rounded-lg bg-main-blue text-[1.25em] font-bold uppercase`}
            data-key={key}
            onClick={onKeyboardClickHandler}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="mb-2 flex w-full gap-[6px]">
        {thirdLayerKeys.map((key, index) => (
          <button
            key={index}
            className={`${
              index === 0 || index === 8
                ? 'flex-[1.5] text-[12px]'
                : 'flex-1 text-[1.25em]'
            } ${
              buttonStyles[key] === 'absent'
                ? 'bg-main-gray'
                : buttonStyles[key] === 'present'
                ? 'bg-main-yellow'
                : buttonStyles[key] === 'correct'
                ? 'bg-main-green'
                : 'bg-main-blue'
            } flex h-[58px] items-center justify-center rounded-lg bg-main-blue font-bold uppercase`}
            data-key={index === 8 ? 'Backspace' : key}
            onClick={onKeyboardClickHandler}
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  );
});

export default Keyboard;
