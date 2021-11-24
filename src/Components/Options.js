import React from 'react';

const Options = ({
  average,
  time,
  trades,
  scalping,
  setTime,
  setAverage,
  setTrades,
  setScalping,
  highToLow,
  setHighToLow,
  favourites,
  setFavourites,
  busdOnly,
  setBusdOnly
}) => {
  return (
    <div className='border rounded px-2'>
      <label>Options :</label>
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

      <div className='form-check form-check-inline form-switch'>
        <input
          className='form-check-input'
          type='checkbox'
          value=''
          id='highToLow'
          onChange={() => setHighToLow(!highToLow)}
          checked={highToLow}
        />
        <label className='form-check-label' htmlFor='highToLow'>
          Top Trades
        </label>
      </div>

      <div className='form-check form-check-inline form-switch'>
        <input
          className='form-check-input'
          type='checkbox'
          value=''
          id='favourites'
          onChange={() => setFavourites(!favourites)}
          checked={favourites}
        />
        <label className='form-check-label' htmlFor='favourites'>
          Favourites
        </label>
      </div>

      <div className='form-check form-check-inline form-switch'>
        <input
          className='form-check-input'
          type='checkbox'
          value=''
          id='busdOnly'
          onChange={() => setBusdOnly(!busdOnly)}
          checked={busdOnly}
        />
        <label className='form-check-label' htmlFor='busdOnly'>
          Show BUSD Only
        </label>
      </div>
    </div>
  );
};

export default Options;
