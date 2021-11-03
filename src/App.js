import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import Search from './Components/Search';
import Table from './Components/Table';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';

const API = 'https://api3.binance.com/api/v3/klines?';

const App = () => {
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
          symbol: 'BNBBUSD',
          interval: '1d',
          limit: '25'
        })
      // { mode: 'no-cors' }
    );

    const fetchedData = await res.json();
    return fetchedData.reverse();
  };

  const onSearch = async ({ limit, symbol, interval, endTime, startTime }) => {
    const res = await fetch(
      API +
        new URLSearchParams({
          symbol,
          interval,
          limit,
          startTime,
          endTime
        })
      // { mode: 'no-cors' }
    );

    console.log(process.env.npm_package_version, 'version');

    const fetchedData = await res.json();
    setData(fetchedData.reverse());
  };

  return (
    <Router>
      <Header />
      <Search onSearch={onSearch} />
      <Table data={data} />
      <Footer />
    </Router>
  );
};

export default App;
