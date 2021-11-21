import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './Components/Header';
import Search from './Components/Search';
import Table from './Components/Table';
import Footer from './Components/Footer';
import Timer from './Components/Timer';
import Price from './Components/Price';
import Options from './Components/Options';
import TopTrades from './Components/TopTrades';

const API = 'https://api3.binance.com/api/v3/klines?';

const App = () => {
  const [data, setData] = useState([]);
  const [market, setMarket] = useState([]);

  const [symbol, setSymbol] = useState('SHIBBUSD');
  const [limit, setLimit] = useState(20);
  const [interval, setInterval] = useState('1m');
  const [decimal, setDecimal] = useState(8);
  const [latestClose, setLatestClose] = useState(0);

  const [highToLow, setHighToLow] = useState(false);
  const [average, setAverage] = useState(true);
  const [time, setTime] = useState(false);
  const [trades, setTrades] = useState(true);
  const [scalping, setScalping] = useState(true);
  const [favourites, setFavourites] = useState(true);

  useEffect(() => {
    onSearch();
  }, [symbol, limit, interval]);

  const onSelectSymbol = (x) => {
    setSymbol(x);
    onSearch();
    return;
  };

  const onFetchTrade = async () => {
    const res = await axios.get('https://api3.binance.com/api/v3/ticker/24hr');

    const output = await res.data.map((x) => {
      return {
        symbol: x.symbol,
        priceChangePercent: Math.round(parseFloat(x.priceChangePercent)),
        priceChange: Math.round(parseFloat(x.priceChange))
      };
    });

    const outputSorted = await output;

    setMarket(outputSorted);
    return;
  };

  const onSearch = async () => {
    const res = await axios.get(API, {
      params: {
        symbol,
        interval,
        limit
      }
    });

    const fetchedData = await res.data.reverse();
    await setData(fetchedData);
    await setLatestClose(fetchedData[0][3]);
    await onFetchTrade();
  };

  const onToogle = async () => {
    setHighToLow(!highToLow);
  };

  const onChangeSymbol = (e) => {
    console.log(e);
    setSymbol(e);
  };

  return (
    <Router>
      <Header />
      <Route
        path='/'
        exact
        render={() => (
          <div className='container'>
            <Search
              symbol={symbol}
              interval={interval}
              limit={limit}
              decimal={decimal}
              favourites={favourites}
              setSymbol={onChangeSymbol}
              setInterval={setInterval}
              setLimit={setLimit}
              setDecimal={setDecimal}
              onSearch={onSearch}
            />
            <div className='row'>
              <div className='col-md-10'>
                <Table
                  data={data}
                  decimal={decimal}
                  average={average}
                  time={time}
                  trades={trades}
                />
              </div>
              <div className='col-md-2'>
                <Options
                  average={average}
                  time={time}
                  trades={trades}
                  scalping={scalping}
                  favourites={favourites}
                  setAverage={setAverage}
                  setTime={setTime}
                  setTrades={setTrades}
                  setScalping={setScalping}
                  setFavourites={setFavourites}
                  highToLow={highToLow}
                  setHighToLow={onToogle}
                />
                {scalping && (
                  <Price symbol={symbol} latestClose={latestClose} />
                )}
                {scalping && <Timer onSearch={onSearch} symbol={symbol} />}
                <TopTrades
                  market={market}
                  highToLow={highToLow}
                  favouites={favourites}
                  onToggle={onSelectSymbol}
                  setSymbol={setSymbol}
                />
              </div>
            </div>
          </div>
        )}
      />

      <Footer />
    </Router>
  );
};

export default App;
