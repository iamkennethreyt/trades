import { useEffect } from 'react';
import Clock from 'react-live-clock';

const Timer = ({ onSearch }) => {
  useEffect(() => {
    if (new Date().getSeconds() === 0) {
      onSearch();
    }
    const intervalClock = setInterval(() => {}, 1000);
    return () => clearInterval(intervalClock);
  }, []);

  return (
    <label className=''>
      Refresh in (<strong>{<Clock format={'ss'} ticking={true} />}</strong>)
      seconds
    </label>
  );
};

export default Timer;
