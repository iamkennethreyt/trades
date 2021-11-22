import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Price = ({ symbol, latestClose, onSearch }) => {
  const [state, setState] = useState({ price: 0 });

  const getData = async () => {
    const dataFromServer = await fetchData();
    setState({ price: parseFloat(dataFromServer.price) });
  };

  useEffect(() => {
    if (new Date().getSeconds() === 0) {
      onSearch();
    }
    const intervalClock = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(intervalClock);
  }, [symbol]);

  const fetchData = async () => {
    const res = await axios.get(`https://api.binance.com/api/v3/ticker/price`, {
      params: { symbol }
    });

    return res.data;
  };

  return (
    <div className='border rounded text-end px-2 mt-2'>
      <Helmet>
        <title>{`${symbol} : ${state.price}`}</title>
      </Helmet>

      <h3 style={{ color: `${latestClose > state.price ? 'red' : 'green'}` }}>
        {state.price}
      </h3>
    </div>
  );
};

export default Price;
