import React from 'react';
import symbols from '../data/symbol';

const TopTrades = ({
  market,
  highToLow,
  favouites,
  onToggle,
  symbol,
  setHighToLow
}) => {
  const sorting = (arr, prop) => {
    if (highToLow) {
      return arr.sort((a, b) =>
        a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
      );
    } else {
      return arr.sort((a, b) =>
        a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
      );
    }
  };

  const toFilter = favouites
    ? market.filter(
        (arr) => symbols.filter((fav) => fav.value === arr.symbol).length !== 0
      )
    : market;

  const data = sorting(toFilter, 'priceChangePercent');

  return (
    <div className=''>
      <div className='table-responsive'>
        <table className='table table-bordered table-sm table-hover'>
          <thead>
            <tr className='text-center'>
              <th scope='col'>
                <div className='form-check form-check-inline form-switch'>
                  <label>{highToLow ? 'Top Trades' : 'Low Trades'}</label>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='highToLow'
                    onChange={() => setHighToLow(!highToLow)}
                    checked={highToLow}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 23).map((x, i) => {
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopTrades;
