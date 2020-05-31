import React, { Component } from 'react';

import CryptoSymbols from '../components/cryptoSymbols'

// https://rapidapi.com/alphavantage/api/alpha-vantage?endpoint=apiendpoint_1811a37f-a9b3-4e77-97cc-1648ba1d19b0
class Cryptocurrency extends Component {

    render() {
        return (
            <div  className="container-fluid">
                <h1>Cryptocurrency</h1>
                <p>
                    Please select a Cryptocurrency from the following drop-down field:
                </p>

                <CryptoSymbols/>

            </div>
        );
    }
}

export default Cryptocurrency;
