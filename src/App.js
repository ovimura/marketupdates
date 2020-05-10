import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  useParams
} from 'react-router-dom';

import logo from './logo.svg';
import './css/App.css';
import Header from './components/header';
import Footer from './components/footer';
import Homepage from './components/homePage';
import News from './components/news';
import Stocks from './components/stocks';
import Crypto from './components/crypto';
import About from './components/about';
import Data from './components/data';

require('dotenv').config();

console.log(process.env.REACT_APP_RAPIDAPI_KEY);

function App() {
  return (
    <Router basename="/">
    <div className="App">
        <Header />
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/News' component={News}/>
          <Route path='/Stocks/:dataId?' component={Stocks}/>
          <Route exact path='/Crypto' component={Crypto}/>
          <Route exact path='/About' component={About}/>
          <Route path='/:dataId' component={Data}/>
        <Footer />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
    </Router>
  );
}

export default App;
