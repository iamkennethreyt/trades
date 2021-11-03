import moment from 'moment';
import React from 'react';
import { useState } from 'react';

import intervals from '../data/interval';
import symbols from '../data/symbol';

const Search = ({ onSearch }) => {
  const [symbol, setSymbol] = useState('BNBBUSD');
  const [limit, setLimit] = useState('25');
  const [interval, setInterval] = useState('1d');
  const [endTime, setEndTime] = useState(moment().format('L'));
  const [startTime, setStartTime] = useState(
    moment().subtract(1, 'weeks').format('L')
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const mTime = (time) => {
      const t = new Date(
        `${moment(time).format('MM-DD-yyyy')} ${moment().format('h:mm:ss')}`
      );

      return t.getTime();
    };

    onSearch({
      symbol,
      interval,
      startTime: mTime(startTime),
      endTime: mTime(endTime),
      limit
    });
  };

  return (
    <div className='container'>
      <form className='row g-3 my-3' onSubmit={onSubmit}>
        <div className='col-auto form-floating'>
          <select
            className='form-select'
            id='symbols'
            aria-label='Floating label select example'
            readOnly
            onChange={(e) => setSymbol(e.target.value)}
            defaultValue={symbol}
          >
            {symbols.map((s, i) => (
              <option key={i} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <label htmlFor='symbols'>Select Symbols</label>
        </div>

        <div className='col-auto form-floating'>
          <select
            readOnly
            className='form-select'
            id='intervals'
            aria-label='Floating label select example'
            onChange={(e) => setInterval(e.target.value)}
            defaultValue={interval}
          >
            {intervals.map((n, i) => (
              <option key={i} value={n.value}>
                {n.label}
              </option>
            ))}
          </select>
          <label htmlFor='intervals'>Select Intervals</label>
        </div>

        <div className='col-auto form-floating'>
          <input
            type='date'
            className='form-control'
            id='startTime'
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label htmlFor='startTime'>Start time</label>
        </div>

        <div className='col-auto form-floating'>
          <input
            type='date'
            className='form-control'
            id='endTime'
            onChange={(e) => setEndTime(e.target.value)}
          />
          <label htmlFor='endTime'>End time</label>
        </div>

        <div className='col-auto form-floating'>
          <input
            type='number'
            className='form-control'
            id='limit'
            onChange={(e) => setLimit(e.target.value)}
            defaultValue={limit}
          />
          <label htmlFor='limit'>Limit</label>
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-primary py-3'>
            Confirm identity
          </button>
        </div>
      </form>
      <label>
        Query from <strong>{moment(startTime).format('MMM DD, YYYY')} </strong>
        to
        <strong> {moment(endTime).format('MMM DD, YYYY')}</strong>
      </label>
    </div>
  );
};

export default Search;
