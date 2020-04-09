import React from 'react';
import './App.css';
import SearchView from './geocode/components/SearchView';
import WeatherView from './weather/components/WeatherView';
import WeatherPage from './weather/components/WeatherPage';
import header from './header/header';
import Header from './header/header';

function App() {
  return (
    <div id="app">
      <Header title={"Rainstorm"} items={[<SearchView />]} />
      <WeatherPage />
    </div>
  );
}

export default App;
