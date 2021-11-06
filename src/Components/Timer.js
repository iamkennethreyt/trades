import { useEffect } from 'react';
import Clock from 'react-live-clock';

const Timer = ({ onTime }) => {
  useEffect(() => {
    const intervalClock = setInterval(() => {
      if (new Date().getSeconds() === 0) {
        onTime();
      }
    }, 1000);
    return () => clearInterval(intervalClock);
  }, []);

  return (
    <label className='py-1'>
      Refresh in ({<Clock format={'ss'} ticking={true} />}) seconds
    </label>
  );
};

export default Timer;
