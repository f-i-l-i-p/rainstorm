import React from 'react';
import './App.css';
import SearchBox from './geocode/components/SearchBox';
import WeatherPage from './weather/components/WeatherPage';
import Header from './header/header';

function App() {
  return (
    <div id="app">
      <Header title={"RainStorm"} items={[<SearchBox style={{ width: "25em" }} />]} />
      <div className="page">
        <WeatherPage />
      </div>
    </div>
  );
}

export default App;
