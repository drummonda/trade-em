import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './socket'
import Main from './app/main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Binance Data Stream for ETH/BTC currency pair</h1>
          <Main />
        </header>
      </div>
    );
  }
}

export default App;
