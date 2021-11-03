import moment from 'moment';
import React from 'react';

const Table = ({ data }) => {
  const converter = (num) => parseFloat(num).toFixed(2);
  return (
    <div className='container'>
      <table className='table table-bordered table-sm'>
        <thead>
          <tr className='text-center'>
            <th scope='col'>Open Time</th>
            <th scope='col'>Open</th>
            <th scope='col'>High</th>
            <th scope='col'>%</th>
            <th scope='col'>Low</th>
            <th scope='col'>%</th>
            <th scope='col'>Close</th>
            <th scope='col'>Average</th>
            <th scope='col'>Close Time</th>
            <th scope='col'>Number of trades</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => {
            const ave = parseFloat(data[1]) + parseFloat(data[4]);
            const high = (data[2] / data[1]) * 100 - 100;
            const low = 100 - (100 * data[3]) / data[1];
            const classes =
              data[1] > data[4] ? 'table-success' : 'table-danger';

            return (
              <tr key={i}>
                <td className='text-center'>
                  {moment(data[0]).format('MM/DD, h:mm A')}
                  {/* {data[0]} */}
                </td>
                <td className='text-end'>{converter(data[1])}</td>
                <td className='text-end'>{converter(data[2])}</td>
                <td className='text-center'>{converter(high)}</td>
                <td className='text-end'>{converter(data[3])}</td>
                <td className='text-center'>{converter(low)}</td>
                <td className='text-end'>{converter(data[4])}</td>
                <td className={`text-end ${classes}`}>{converter(ave / 2)}</td>
                <td className='text-center'>
                  {moment(data[6]).format('MM/DD, h:mm A')}
                </td>
                <td className='text-center'>{data[8].toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className='text-end'>
        Length : <strong>{data.length}</strong>
      </p>
    </div>
  );
};

export default Table;
