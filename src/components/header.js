import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img
            src="./arrow1.png"
            alt="Market Hub"
            style={{ width: '100px', height: '60px' }}
          />
        </div>
        <nav>
          <ul>
            {/* <li className="firstmenu">
                            <Link to="/">Converter</Link>
                        </li> */}
            {/* <li>
                            <Link to="/Stocks/aapl">APPL Stock</Link>
                        </li> */}
            <li>
              <Link to="/">News</Link>
            </li>
            <li>
              <Link to="/Stocks">Stocks</Link>
            </li>
            <li>
              <Link to="/Crypto">Crypto</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li className="lastmenu">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
