import React, { Component } from 'react';

import '../css/About.css';

class About extends Component {
    render() {
        return (
            <div  className="container-fluid">
                <h1>About</h1>
                <br />
                <hr />
                <div>
                    <p>Author: Ovidiu Mura</p>
                    <p>Email: mura@pdx.edu</p>
                </div>
                <hr/>
                <p>
                    Used APIs:
                </p>
                <ul>
                    <li><a href="https://rapidapi.com/natkapral/api/currency-converter5/details" className="aAbout">Currency Converter</a></li>
                    <li><a href="https://finnhub.io" className="aAbout">Finnhub Stock APIs</a></li>
                    <li><a href="https://www.coingecko.com/en/api" className="aAbout">CoinGecko</a></li>
                </ul>
                <hr/>
            </div>
        );
    }
}

export default About;
