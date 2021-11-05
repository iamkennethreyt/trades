import React from 'react';
import { useState, useEffect } from 'react';

const Calculator = () => {
  const [curentPrice, setCurentPrice] = useState(0);
  const [value, setValue] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData();
      setCurentPrice(dataFromServer[0].current_price);
    };

    getData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=binance-usd'
    );

    const fetchedData = await res.json();
    return fetchedData;
  };

  return (
    <div className='container'>
      <div className='row g-3'>
        <div className='col-auto form-floating'>
          <input
            className='form-control'
            id='value'
            onChange={(e) => setValue(e.target.value)}
            defaultValue={value}
          />
          <label htmlFor='value'>value</label>
        </div>
        <h2 className='col-auto pt-1'>
          = {(curentPrice * value).toFixed(2).toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

export default Calculator;
