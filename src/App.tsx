import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import SearchView from './geocode/components/SearchView';
import WeatherView from './weather/components/WeatherView';
import WeatherPage from './weather/components/WeatherPage';

function App() {
  return (
    <div id="app">
      <SearchView />
      <WeatherPage />
    </div>
  );
}

export default App;
