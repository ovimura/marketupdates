import React, { Component } from 'react';

import CryptoSymbols from '../components/cryptoSymbols'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// https://rapidapi.com/alphavantage/api/alpha-vantage?endpoint=apiendpoint_1811a37f-a9b3-4e77-97cc-1648ba1d19b0
class Cryptocurrency extends Component {
    state = {
        sDate: new Date(),
        eDate: new Date()
    }

    handleChangeFrom = date => {
        this.setState({sDate: date})
    }

    handleChangeTo = date => {
        this.setState({eDate: date})
    }

    render() {
        return (
            <>

            <div  className="container-fluid">
                <h1>Cryptocurrency</h1>
                <p>
                    Please select a Cryptocurrency from the following drop-down field:
                </p>
                <table className="cryptoSelection">
                    <tr>
                        <th className="cryptoSelection">
                            <table className="cryptoDate">
                                <tr>
                                    <th className="fromCryptoDate">
                                        From: 
                                        <DatePicker selected={this.state.sDate} onChange={this.handleChangeFrom} />
                                    </th>
                                    <th className="toCryptoDate">
                                        To: 
                                        <DatePicker selected={this.state.eDate} onChange={this.handleChangeTo} />
                                    </th>
                                </tr>
                            </table>
                            <div className="cryptoSymName">
                                <CryptoSymbols/>
                            </div>
                        </th>
                    </tr>
                </table>
            </div>

            </>
        );
    }
}

export default Cryptocurrency;
