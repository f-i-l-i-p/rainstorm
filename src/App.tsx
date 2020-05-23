import React from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import WeatherPage from './weather/components/WeatherPage';
import Header from './components/Header';

function App() {
  return (
    <div id="app">
      <Header title={"RainStorm"} items={[<SearchBox style={{width: "25em"}}/>]} />
      <WeatherPage />
    </div>
  );
}

export default App;
