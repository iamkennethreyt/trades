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
    <div className=''>
      <form className='row g-2 my-3' onSubmit={onSubmit}>
        <div className='col-md-2 col-auto form-floating'>
          <input
            className='form-control'
            id='symbols'
            onChange={(e) => setSymbol(e.target.value)}
            defaultValue={symbol}
          ></input>
          <label htmlFor='symbols'>Input Symbols</label>
        </div>

        <div className='col-md-2 col-auto form-floating'>
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

        <div className='col-md-2 col-auto form-floating'>
          <input
            type='number'
            className='form-control'
            id='limit'
            onChange={(e) => setLimit(e.target.value)}
            defaultValue={limit}
          />
          <label htmlFor='limit'>Limit</label>
        </div>
        <div className='col-md-2 col-auto form-floating'>
          <input
            type='number'
            className='form-control'
            id='decimal'
            onChange={(e) => setDecimal(e.target.value)}
            defaultValue={decimal}
          />
          <label htmlFor='decimal'>Decimal</label>
        </div>
        <div className='col-md-2 col-auto'>
          <input
            type='submit'
            className='btn btn-primary py-3 px-4'
            value='Search'
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
