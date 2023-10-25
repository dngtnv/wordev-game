import { useEffect } from 'react';

const Toast = ({ alerts, setAlerts }) => {
  useEffect(() => {
    if (alerts.length === 0) return;
    // Calculate timeout based on the length of the message
    const timeout = 1000 - (alerts.length - 1) * 200;
    // Hide the alert after 2 seconds
    const timer = setTimeout(() => {
      // Remove the first alert from the array after 2 seconds
      setAlerts((prevAlerts) => {
        const newAlerts = [...prevAlerts];
        newAlerts.shift();
        return newAlerts;
      });
    }, timeout);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [alerts, setAlerts]);

  return (
    <div className='pointer-events-none absolute left-1/2 top-14 flex w-fit -translate-x-1/2 translate-y-0 flex-col gap-3'>
      {alerts.map((alert, index) => (
        <div
          key={index}
          className='rounded-[4px] bg-white p-3 text-[14px] font-bold'
        >
          {alert.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
