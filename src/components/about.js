import React, { Component } from 'react';

import '../css/About.css';

class About extends Component {
    render() {
        return (
            <div  className="container-fluid">
                <h1>About</h1>
                <p>
                    APIs
                </p>
                <ul>
                    <li><a href="https://rapidapi.com/natkapral/api/currency-converter5/details" className="aAbout">Currency Converter</a></li>
                </ul>
            </div>
        );
    }
}

export default About;
