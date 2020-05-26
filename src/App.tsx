import React, { Dispatch } from 'react';
import './App.css';
import SearchBox from './components/atoms/SearchBox';
import WeatherPage from './components/pages/WeatherPage';
import Header from './components/organisms/Header';

function App() {
  return (
    <div id="app">
      <Header items={[<SearchBox style={{ width: "25em" }} />]} />
      <div className="page">
        <WeatherPage />
      </div>
    </div>
  );
}

export default App;
