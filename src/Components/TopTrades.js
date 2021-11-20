import React from 'react';
import symbols from '../data/symbol';

const TopTrades = ({ market, highToLow, favouites, onToggle }) => {
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
    <div className='mt-2'>
      <div className='table-responsive'>
        <table className='table table-bordered table-sm table-hover'>
          <thead>
            <tr className='text-center table-primary'>
              <th scope='col'>{highToLow ? 'Top Trades' : 'Low Trades'}</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 16).map((x, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => onToggle(x.symbol)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className='d-flex justify-content-between'>
                    <span>{x.symbol}</span> <span>{x.priceChangePercent}</span>
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
