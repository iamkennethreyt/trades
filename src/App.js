import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Search from './Components/Search';
import Table from './Components/Table';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';

const API = 'https://api3.binance.com/api/v3/klines?';

const App = () => {
  const [symbol, setSymbol] = useState('BNBBUSD');
  const [limit, setLimit] = useState(20);
  const [interval, setInterval] = useState('1h');
  const [decimal, setDecimal] = useState(2);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchTasks();
      setData(dataFromServer);
    };

    getData();
  }, []);

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
    );

    const fetchedData = await res.json();
    setData(fetchedData.reverse());
  };

  const onChangeSymbol = (e) => {
    setSymbol(e);
  };
  const onChangeInterval = (e) => {
    setInterval(e);
  };
  const onChangeLimit = (e) => {
    setLimit(e);
  };

  const onChangeDecimal = (e) => {
    setDecimal(e);
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
                symbol={symbol}
                interval={interval}
                limit={limit}
                decimal={decimal}
                setSymbol={onChangeSymbol}
                setInterval={onChangeInterval}
                setLimit={onChangeLimit}
                setDecimal={onChangeDecimal}
                onSearch={onSearch}
              />
              <Table data={data} decimal={decimal} />
            </>
          )}
        />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
