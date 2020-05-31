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
    from = 0;
    to = 0;
    handleChangeFrom = date => {
        this.setState({sDate: date})
        var from = Math.round(new Date(date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()).getTime()/1000)
        this.from = from;
        var doc = document.getElementById("sp1");
        if(doc.innerHTML !== "")
            doc.innerHTML = "";
        doc.appendChild(document.createTextNode(from));
    }

    handleChangeTo = date => {
        this.setState({eDate: date})
        var to = Math.round(new Date(date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()).getTime()/1000)
        this.to = to;
        var doc = document.getElementById("sp2");
        if(doc.innerHTML !== "")
            doc.innerHTML = "";
        doc.appendChild(document.createTextNode(to));
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
                                        <span id="sp1"></span>
                                    </th>
                                    <th className="toCryptoDate">
                                        To: 
                                        <DatePicker selected={this.state.eDate} onChange={this.handleChangeTo} />
                                        <span id="sp2"></span>
                                    </th>
                                </tr>
                            </table>
                            <div className="cryptoSymName">
                                <CryptoSymbols from={this.from} to={this.to}/>
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
