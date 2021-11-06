import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import Timer from './Timer';
import Clock from 'react-live-clock';

const Table = ({
  data,
  decimal,
  onTime,
  average,
  setAverage,
  time,
  trades,
  scalping,
  setTime,
  setTrades,
  setScalping
}) => {
  const converter = (num) => parseFloat(num).toFixed(decimal);

  const avg = (x) =>
    data.reduce((r, c) => r + parseFloat(c[x]), 0) / data.length;

  return (
    <div className='container'>
      <div className='d-flex justify-content-end'>
        {scalping && <Timer onTime={onTime} />}
      </div>
      <div className='d-flex justify-content-between'>
        <div>
          <div className='form-check form-check-inline form-switch'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='average'
              onChange={() => setAverage(!average)}
              checked={average}
            />
            <label className='form-check-label' htmlFor='average'>
              Show Average
            </label>
          </div>

          <div className='form-check form-check-inline form-switch'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='time'
              onChange={() => setTime(!time)}
              checked={time}
            />
            <label className='form-check-label' htmlFor='time'>
              Show Time
            </label>
          </div>

          <div className='form-check form-check-inline form-switch'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='trades'
              onChange={() => setTrades(!trades)}
              checked={trades}
            />
            <label className='form-check-label' htmlFor='trades'>
              Show Trades
            </label>
          </div>
        </div>

        <div className='form-check form-check-inline form-switch'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id='scalping'
            onChange={() => setScalping(!scalping)}
            checked={scalping}
          />
          <label className='form-check-label' htmlFor='scalping'>
            Scalping
          </label>
        </div>
      </div>

      <table className='table table-bordered table-sm table-responsive'>
        <thead>
          <tr className='text-center table-primary'>
            {time && <th scope='col'>Open Time</th>}
            <th scope='col'>Open</th>
            <th scope='col'>High</th>
            <th scope='col'>%</th>
            <th scope='col'>Low</th>
            <th scope='col'>%</th>
            <th scope='col'>Close</th>
            <th scope='col'>Average</th>
            {time && <th scope='col'>Close Time</th>}

            {trades && <th scope='col'>Number of trades</th>}
          </tr>
          {average && (
            <tr className='text-end table-warning'>
              {time && <th scope='col'></th>}
              <th scope='col'>{converter(avg(1))}</th>
              <th scope='col'>{converter(avg(2))}</th>
              <th scope='col' className='text-center'>
                {((avg(2) / avg(1)) * 100 - 100).toFixed(2)}
              </th>
              <th scope='col'>{converter(avg(3))}</th>
              <th scope='col' className='text-center'>
                {(100 - (100 * avg(3)) / avg(1)).toFixed(2)}
              </th>
              <th scope='col'>{converter(avg(4))}</th>
              <th scope='col'>{converter((avg(4) + avg(1)) / 2)}</th>
              {time && <th scope='col'></th>}
              {trades && (
                <th scope='col' className='text-center'>
                  {Math.round(avg(8)).toLocaleString()}
                </th>
              )}
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((data, i) => {
            const ave = parseFloat(data[1]) + parseFloat(data[4]);
            const high = ((data[2] / data[1]) * 100 - 100).toFixed(2);
            const low = (100 - (100 * data[3]) / data[1]).toFixed(2);
            const classes =
              data[1] < data[4] ? 'table-success' : 'table-danger';

            return (
              <tr key={i}>
                {time && (
                  <td className='text-center'>
                    {moment(data[0]).format('MM/DD, h:mm A')}
                  </td>
                )}
                <td className='text-end'>{converter(data[1])}</td>
                <td className='text-end'>{converter(data[2])}</td>
                <td className='text-center'>{high}</td>
                <td className='text-end'>{converter(data[3])}</td>
                <td className='text-center'>{low}</td>
                <td className='text-end'>{converter(data[4])}</td>
                <td className={`text-end ${classes}`}>{converter(ave / 2)}</td>
                {time && (
                  <td className='text-center'>
                    {moment(data[6]).format('MM/DD, h:mm A')}
                  </td>
                )}
                {trades && (
                  <td className='text-center'>{data[8].toLocaleString()}</td>
                )}
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
