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
    <label className='py-1'>
      Refresh in ({<Clock format={'ss'} ticking={true} />}) seconds
    </label>
  );
};

export default Timer;
