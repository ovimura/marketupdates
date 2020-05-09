import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import logo from './logo.svg';
import './css/App.css';
import Header from './components/header';
import Footer from './components/footer';
import Homepage from './components/homePage';
import Products from './components/products';

function App() {
  return (
    <Router>
    <div className="App">
        <Header />
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/Products' component={Products}/>
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
