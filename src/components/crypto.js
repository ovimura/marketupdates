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
    date = new Date();
    from = Math.round(new Date(this.date.getFullYear() + "." + (this.date.getMonth() + 1) + "." + this.date.getDate()).getTime()/1000);
    to = Math.round(new Date(this.date.getFullYear() + "." + (this.date.getMonth() + 1) + "." + this.date.getDate()).getTime()/1000)+60000;
    handleChangeFrom = date => {
        this.setState({sDate: date})
        var from = Math.round(new Date(date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()).getTime()/1000)
        this.from = from;
        // var doc = document.getElementById("sp1");
        // if(doc.innerHTML !== "")
        //     doc.innerHTML = "";
        // doc.appendChild(document.createTextNode(from));
    }

    handleChangeTo = date => {
        this.setState({eDate: date})
        var to = Math.round(new Date(date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()).getTime()/1000)
        this.to = to;
        // var doc = document.getElementById("sp2");
        // if(doc.innerHTML !== "")
        //     doc.innerHTML = "";
        // doc.appendChild(document.createTextNode(to));
    }

    render() {
        return (
            <>

            <div  className="container-fluid">
                <h1>Cryptocurrency</h1>
                <p>
                    Please select a Cryptocurrency from the following drop-down field:
                </p>
                <table>
                    <tbody>
                        <tr style={{width:"50px"}}>
                            <td className="cryptoAlign">
                                <label htmlFor="start">From:</label>
                                <DatePicker id="start" name="start" className="cryptoDateInput" selected={this.state.sDate} onChange={this.handleChangeFrom} />
                            </td>
                            <td className="cryptoAlign">
                                <label htmlFor="end">To:</label>
                                <DatePicker id="end" name="end" className="cryptoDateInput" selected={this.state.eDate} onChange={this.handleChangeTo} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{width:"50px"}}>                       
                    <CryptoSymbols from={this.from} to={this.to}/>
                </div>

            </div>

            </>
        );
    }
}

export default Cryptocurrency;
