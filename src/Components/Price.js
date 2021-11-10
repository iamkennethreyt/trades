import { useState, useEffect } from 'react';
import axios from 'axios';
const Price = ({ symbol }) => {
  const [state, setState] = useState({ price: 0 });
  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData();
      setState({ price: dataFromServer.price });
    };
    const intervalClock = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(intervalClock);
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`https://api.binance.com/api/v3/ticker/price`, {
      params: { symbol }
    });

    return res.data;
  };

  return (
    <div className='border rounded text-end px-2'>
      <h3>{state.price}</h3>
    </div>
  );
};

export default Price;
