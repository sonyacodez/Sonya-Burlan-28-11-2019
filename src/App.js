import React from 'react';
// import { BrowserRouter, Route, Link } from "react-router-dom"
import './App.css';
import * as Home from './components/Home';
import * as AllFavorites from './components/AllFavorites';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Hello world!
        <Home/>
        <AllFavorites/>
      </header>
    </div>
  );
};

export default App;
