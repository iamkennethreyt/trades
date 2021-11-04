import React from 'react';

import intervals from '../data/interval';
import symbols from '../data/symbol';

const Search = ({
  symbol,
  limit,
  interval,
  setSymbol,
  setLimit,
  decimal,
  setInterval,
  setDecimal,
  onSearch
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className='container'>
      <form className='row g-3 my-3' onSubmit={onSubmit}>
        <div className='col-auto form-floating'>
          <select
            className='form-select'
            id='symbols'
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
            type='number'
            className='form-control'
            id='limit'
            onChange={(e) => setLimit(e.target.value)}
            defaultValue={limit}
          />
          <label htmlFor='limit'>Limit</label>
        </div>

        <div className='col-auto form-floating'>
          <input
            type='number'
            className='form-control'
            id='decimal'
            onChange={(e) => setDecimal(e.target.value)}
            defaultValue={decimal}
          />
          <label htmlFor='decimal'>Decimal</label>
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-primary py-3'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
