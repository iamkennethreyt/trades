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

  const [average, setAverage] = useState(true);
  const [time, setTime] = useState(false);
  const [trades, setTrades] = useState(false);
  const [scalping, setScalping] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await onSearch();
      await fetchTopMarket();
    };

    getData();
  }, []);

  const sorting = (arr, prop) => {
    return arr.sort((a, b) =>
      a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
    );
  };

  const fetchTopMarket = async () => {
    const res = await axios.get('https://api3.binance.com/api/v3/ticker/24hr');

    const output = await res.data.map((x) => {
      return {
        symbol: x.symbol,
        priceChangePercent: parseFloat(x.priceChangePercent),
        priceChange: parseFloat(x.priceChange)
      };
    });

    const outputSorted = await sorting(output, 'priceChangePercent');
    setMarket(outputSorted.slice(0, 16));
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

    const fetchedData = await res.data;
    setData(fetchedData.reverse());
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
              setSymbol={setSymbol}
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
                {scalping && <Price symbol={symbol} />}
                {scalping && <Timer onTime={onSearch} />}
                <Options
                  average={average}
                  time={time}
                  trades={trades}
                  scalping={scalping}
                  setAverage={setAverage}
                  setTime={setTime}
                  setTrades={setTrades}
                  setScalping={setScalping}
                />
                <TopTrades market={market} />
              </div>
            </div>
          </div>
        )}
      />

      {/* <Route path='/calculator' component={Calculator} /> */}
      <Footer />
    </Router>
  );
};

export default App;
