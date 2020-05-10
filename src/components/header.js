import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    LOGO
                </div>
                <nav>
                    <ul>
                        <li className="firstmenu">
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Stocks">Stock</Link>
                        </li>
                        <li>
                            <Link to="/Stocks/appl">APPL Stock</Link>
                        </li>
                        <li>
                            <Link to="/Crypto">Crypto</Link>
                        </li>
                        <li>
                            <Link to="/News">News</Link>
                        </li>
                        <li className="lastmenu">
                            <Link to="/About">About</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
