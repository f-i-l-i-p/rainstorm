import React from 'react';
import './App.css';
import SearchView from './geocode/components/SearchView';
import WeatherView from './weather/components/WeatherView';

function App() {
  return (
    <div>
      <SearchView />
      <WeatherView />
    </div>
  );
}

export default App;
