import { useState, useEffect } from 'react';
import axios from 'axios';
const Price = ({ symbol, triggerFunc }) => {
  const [state, setState] = useState({ price: 0 });

  const getData = async () => {
    const dataFromServer = await fetchData();
    setState({ price: parseFloat(dataFromServer.price) });
  };

  useEffect(() => {
    const intervalClock = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(intervalClock);
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`https://api.binance.com/api/v3/ticker/price`, {
      params: { symbol }
    });

    // console.log(res.data);

    return res.data;
  };

  return (
    <div className='border rounded text-end px-2'>
      <h3>{state.price}</h3>
    </div>
  );
};

export default Price;
