import React from 'react';
import { useState, useEffect } from 'react';
const axios = require('axios');

const TopMarket = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    const intervalClock = setInterval(() => {
      if (new Date().getSeconds() === 0) {
        fetchData();
      }
    }, 1000);

    return () => clearInterval(intervalClock);
  }, []);

  const fetchData = async () => {
    const res = await axios.get('https://api3.binance.com/api/v3/ticker/24hr');
    const filtered = await res.data.filter((x) => x.symbol.includes('BUSD'));
    const symbols = await filtered.map((x) => x.symbol);

    const mapped = await Promise.all(
      symbols.map(async (symbol) => {
        const res = await axios.get('https://api3.binance.com/api/v3/klines', {
          params: {
            symbol,
            interval: '1m',
            limit: 2
          }
        });
        const trades = res.data[0][8];
        return { symbol, trades };
      })
    );

    const sorting = await mapped.sort((a, b) =>
      a['trades'] < b['trades'] ? 1 : b['trades'] < a['trades'] ? -1 : 0
    );

    const sliced = sorting.slice(0, 20);

    setData(sliced);

    return;
  };

  return (
    <div className=''>
      <div className='table-responsive'>
        <table className='table table-bordered table-sm table-hover'>
          <thead>
            <tr className='text-center'>
              <th scope='col'>Top Market</th>
            </tr>
          </thead>
          <tbody>
            {data.map((x, i) => {
              return (
                <tr key={i}>
                  <td className='d-flex justify-content-between'>
                    <span>{x.symbol}</span>
                    <span>{x.trades}</span>
                  </td>
                </tr>
              );
            })}
            {/* {data.slice(0, 51).map((x, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => onToggle(x.symbol)}
                  style={{ cursor: 'pointer' }}
                  className={`${x.symbol === symbol && 'table-info fw-bold'}`}
                >
                  <td className='d-flex justify-content-between'>
                    <span>{x.symbol}</span>{' '}
                    <span>{x.priceChangePercent.toFixed(2)}</span>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopMarket;
