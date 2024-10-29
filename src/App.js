import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  //useParams
} from 'react-router-dom';

//import logo from './logo.svg';
import './css/App.css';
import Header from './components/header';
import Footer from './components/footer';
// import Homepage from './components/homePage';
import News from './components/news';
import Stocks from './components/stocks/stocks';
import Crypto from './components/crypto';
import About from './components/about';
//import Data from './components/data';
// import Plot from './components/plot';

// require('dotenv').config();

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Header />
        <Route exact path="/" component={News} />
        {/* <Route exact path='/News' component={News}/> */}
        {/* <Route path="/Stocks/:dataId?" component={Stocks} /> */}
        <Route exact path="/Stocks" component={Stocks} />
        <Route exact path="/Crypto" component={Crypto} />
        <Route exact path="/About" component={About} />
        {/* <Route path='/:dataId' component={Data}/> */}
        {/* <Plot/> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
