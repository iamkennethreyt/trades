import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [curentPrice, setCurentPrice] = useState('');
  const [value, setValue] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=binance-usd'
      );
      const dataFromServer = await res.json();
      setCurentPrice(dataFromServer[0].current_price);
    };

    getData();
  }, []);

  return (
    <header>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <Link className='navbar-brand fw-bold' to='/'>
            BUSD-TRADES
          </Link>
          <div className='d-flex'>
            <div className='input-group'>
              <input
                type='number'
                className='form-control text-end'
                onChange={(e) => setValue(e.target.value)}
                defaultValue={value}
                placeholder='Input BUSD'
              />
              <span className='input-group-text'>=</span>
              <span className='input-group-text'>
                &#8369; {(curentPrice * value).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
