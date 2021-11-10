import React from 'react';

const TopTrades = ({ market }) => {
  return (
    <div className='mt-3'>
      <div className='table-responsive'>
        <table className='table table-bordered table-sm'>
          <thead>
            <tr className='text-center table-primary'>
              <th scope='col'>Top Trades</th>
            </tr>
          </thead>
          <tbody>
            {market.map((x, i) => {
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
