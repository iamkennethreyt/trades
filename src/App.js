import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Search from './Components/Search';
import Table from './Components/Table';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';
import Calculator from './Components/Calculator';

const API = 'https://api3.binance.com/api/v3/klines?';

const App = () => {
  const [symbol, setSymbol] = useState('BNBBUSD');
  const [limit, setLimit] = useState(20);
  const [interval, setInterval] = useState('1h');
  const [decimal, setDecimal] = useState(2);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData();
      setData(dataFromServer);
    };

    getData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      API +
        new URLSearchParams({
          symbol,
          interval,
          limit
        })
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
      <Header />
      <Route
        path='/'
        exact
        render={(props) => (
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

      <Route path='/calculator' component={Calculator} />
      <Footer />
    </Router>
  );
};

export default App;
