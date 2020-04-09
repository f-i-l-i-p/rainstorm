import React from 'react';
import './App.css';
import SearchView from './geocode/components/SearchView';
import WeatherPage from './weather/components/WeatherPage';
import Header from './header/Header';

function App() {
  return (
    <div id="app">
      <Header title={"RainStorm"} items={[<SearchView />]} />
      <WeatherPage />
    </div>
  );
}

export default App;
