import React from 'react';
import { useState, useEffect } from 'react';
import intervals from '../data/interval';
const axios = require('axios');

const TopMarket = ({ onToggle, symbol, interval }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    const intervalClock = setInterval(() => {
      if (new Date().getSeconds() === 0) {
        fetchData();
      }
    }, 1000);

    return () => clearInterval(intervalClock);
  }, [interval]);

  const fetchData = async () => {
    const res = await axios.get('https://api3.binance.com/api/v3/ticker/24hr');
    const filtered = await res.data.filter((x) => x.symbol.includes('BUSD'));

    const symbols = await filtered.map((x) => x.symbol);

    const mapped = await Promise.all(
      symbols.map(async (symbol) => {
        const res = await axios.get('https://api3.binance.com/api/v3/klines', {
          params: {
            symbol,
            interval,
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

    const sliced = sorting.slice(0, 15);

    setData(sliced);

    return;
  };

  return (
    <div className='mt-2'>
      <div className='table-responsive'>
        <table className='table table-bordered table-sm table-hover'>
          <thead>
            <tr className='text-center'>
              <th scope='col'>
                Top Trades ({intervals.find((x) => x.value === interval).label})
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((x, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => onToggle(x.symbol)}
                  style={{ cursor: 'pointer' }}
                  className={`${x.symbol === symbol && 'table-info fw-bold'}`}
                >
                  <td className='d-flex justify-content-between'>
                    <span>{x.symbol}</span>
                    <span>{x.trades.toLocaleString()}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopMarket;
