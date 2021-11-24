import React, { useEffect } from 'react';
import intervals from '../data/interval';
import symbols from '../data/symbol';

const Search = ({
  symbol,
  limit,
  interval,
  favourites,
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

  useEffect(() => {
    // onSearch();
  }, [symbol, limit, interval]);

  return (
    <div className=''>
      <form className='row g-2 my-3' onSubmit={onSubmit}>
        {favourites ? (
          <div className='col-md-2 col-auto form-floating'>
            <select
              className='form-select'
              id='symbols'
              aria-label='Floating label select example'
              readOnly
              onChange={(e) => setSymbol(e.target.value)}
              value={symbol}
            >
              {symbols.map((s, i) => (
                <option key={i} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <label htmlFor='symbols'>Select Symbols</label>
          </div>
        ) : (
          <div className='col-md-2 col-auto form-floating'>
            <input
              className='form-control'
              id='symbols'
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              value={symbol}
            ></input>
            <label htmlFor='symbols'>Input Symbols</label>
          </div>
        )}

        <div className='col-md-2 col-auto form-floating'>
          <select
            readOnly
            className='form-select'
            id='intervals'
            onChange={(e) => setInterval(e.target.value)}
            value={interval}
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
            value={limit}
          />
          <label htmlFor='limit'>Limit</label>
        </div>
        {/* <div className='col-md-2 col-auto form-floating'>
          <input
            type='number'
            className='form-control'
            id='decimal'
            onChange={(e) => setDecimal(e.target.value)}
            defaultValue={decimal}
          />
          <label htmlFor='decimal'>Decimal</label>
        </div> */}
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
