import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Search from './Components/Search';
import Table from './Components/Table';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';

const API = 'https://api3.binance.com/api/v3/klines?';

const App = () => {
  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState('BNBBUSD');
  const [limit, setLimit] = useState(20);
  const [interval, setInterval] = useState('1h');
  const [decimal, setDecimal] = useState(2);

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchTasks();
      setData(dataFromServer);
    };

    getData();
  });

  const onChangeDecimal = async (e) => {
    setDecimal(e);
    await onSearch();
  };

  const onChangeInterval = (e) => {
    setInterval(e);
    onSearch();
  };

  const onChangeSymbol = (e) => {
    setSymbol(e);
    onSearch();
  };

  const onChangeLimit = async (e) => {
    setLimit(e);
    await onSearch();
  };

  const fetchTasks = async () => {
    const res = await fetch(
      API +
        new URLSearchParams({
          symbol,
          interval,
          limit
        })
      // { mode: 'no-cors' }
    );

    const fetchedData = await res.json();
    return fetchedData.reverse();
  };

  const onSearch = async () => {
    const res = await fetch(
      API +
        new URLSearchParams({
          symbol,
          interval,
          limit
        })
      // { mode: 'no-cors' }
    );

    const fetchedData = await res.json();
    setData(fetchedData.reverse());
  };

  return (
    <Router>
      <div>
        <Header />
        <Route
          path='/'
          exact
          render={() => (
            <>
              <Search
                decimal={decimal}
                interval={interval}
                symbol={symbol}
                limit={limit}
                setInterval={onChangeInterval}
                setSymbol={onChangeSymbol}
                setLimit={onChangeLimit}
                setDecimal={onChangeDecimal}
              />
              <Table data={data} decimal={decimal} />
            </>
          )}
        />
        {/* <Route
          path='/settings'
          render={() => (
            <Settings decimal={decimal} onChangeDecimal={onChangeDecimal} />
          )}
        /> */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
