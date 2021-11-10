import React from 'react';

const TopTrades = ({ market, highToLow }) => {
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

  const data = sorting(market, 'priceChangePercent');

  return (
    <div className='mt-2'>
      <div className='table-responsive'>
        <table className='table table-bordered table-sm'>
          <thead>
            <tr className='text-center table-primary'>
              <th scope='col'>{highToLow ? 'Top Trades' : 'Low Trades'}</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 16).map((x, i) => {
              return (
                <tr key={i}>
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
