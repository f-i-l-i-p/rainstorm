import React, { Dispatch } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import WeatherPage from './components/WeatherPage';
import Header from './components/Header';
import { updateUserLocation } from './store/locationSearch/actions';

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
