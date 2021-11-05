import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
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
    <header>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Crypto
          </Link>
          {/* <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to='/calculator'>
                Calculator
              </Link>
            </li>
          </ul> */}
          {/* <form class='d-flex'>
            <input
              class='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button class='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form> */}
          <div className='d-flex'>
            <div className='input-group'>
              <input
                type='text'
                className='form-control text-end'
                onChange={(e) => setValue(e.target.value)}
                defaultValue={value}
                placeholder='Input BUSD'
              />
              <span className='input-group-text'>=</span>
              <span className='input-group-text'>
                {(curentPrice * value).toFixed(2).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
