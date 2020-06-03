import React, { Component } from 'react';
// import {DatePicker} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const axios = require("axios");

class Homepage extends Component {
    state = {
        quotes: [],
        startDate: new Date(),
        endDate: new Date(),
        selectedSrc: "",
        selectedDst: "",
      };
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      handleChangeStart = date => {
        this.setState({
          startDate: date
        });
        // console.log(date.getFullYear());
        // console.log(this.months[date.getMonth()]);
        // console.log(date.getDate());
        // console.log("lllllllllllll>");
        // var from = date.getDate() + " "+ this.months[date.getMonth()] + ", " + date.getFullYear()
        // var doc = document.getElementById("sp1");
        // if(doc.innerHTML !== "")
        //     doc.innerHTML = "";
        // doc.appendChild(document.createTextNode(from));
      };

      handleChangeEnd = date => {
        this.setState({
          endDate: date
        });
        // console.log(date.getFullYear());
        // console.log(this.months[date.getMonth()]);
        // console.log(date.getDate());
        // console.log("aaaaaaaaaaa>");
        var to = date.getDate() + " "+ this.months[date.getMonth()] + ", " + date.getFullYear()
        var doc = document.getElementById("sp2");
        if(doc.innerHTML !== "")
            doc.innerHTML = "";
        doc.appendChild(document.createTextNode(to));
      };

      componentDidMount() {
        axios({
          "method":"GET",
          "url":"https://currency-converter5.p.rapidapi.com/currency/list",
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"currency-converter5.p.rapidapi.com",
          "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
          "useQueryString":true
          },"params":{
          "format":"json"
          }
            })
            .then((response)=>{
                // console.log(response.data);
                var data = response.data.currencies;
                var q = [];
                // console.log(data);
                for(let t in data) {
                  q.push(t);
                }
                var m = new Map();
                q.forEach(e => {
                  m.set(e, data[e]);
                })
                let qs = [];
                m.forEach((v, k)=>{
                  // console.log(k, v);
                    qs.push({key: k, value: v});
                });
                // console.log(qs);
               this.setState({
                   quotes: [
                       {key: "(Select a currency <code", value: "name>)"}
                   ].concat(qs)
                   });
            })
            .catch((error)=>{
              console.log(error)
            })
      }



    render() {
        return (
            <div className="container-fluid">
            <div>
                <h1>Currency Converter</h1>
                <p>
                
                </p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="currencyAlign">
                                <label htmlFor="dtPicker">Date:</label>
                                <DatePicker className="dateInput" id="dtPicker" name="dtPicker" selected={this.state.startDate} onChange={this.handleChangeStart} />
                  </td>
                  <td className="currencyAlign">
                                  <label htmlFor="3fromCurrency">From:</label>
                                  <select className="select" id="3fromCurrency" name="3fromCurrency" value={this.state.selectedSrc} onChange={e => {
                                    // console.log(this.state.selectedSrc);
                                      this.setState({
                                          selectedSrc: e.target.value,
                                        validationError:
                                          e.target.value === ""
                                            ? "You must select a symbol"
                                            : ""
                                      });
                                  }}>
                                    {this.state.quotes.map((val,index) => (<option key={index} value={val.key}>
                                                                          {val.key}
                                                                          :
                                                                          {val.value}
                                                                        </option>))}
                                  </select>
                                  <div style={{ color: "red", marginTop: "5px", height: "20px" }}>
                                    {this.state.validationError}
                                  </div>
                  </td>
                  <td className="currencyAlign">
                                  <label htmlFor="toCurrency">To:</label>
                                  <select className="select" id="toCurrency" name="toCurrency" value={this.state.selectedDst} onChange={(e) => {
                                      this.setState({
                                          selectedDst: e.target.value,
                                          validationError:
                                          e.target.value === ""
                                            ? "You must select a symbol"
                                            : ""
                                      });
                                  }}>
                                    {this.state.quotes.map((val,index) => (<option key={index} value={val.key}>
                                                                          {val.key}
                                                                          :
                                                                          {val.value}
                                                                        </option>))}
                                  </select>
                                  <div style={{ color: "red", marginTop: "5px", height: "20px" }}>
                                    {this.state.validationError}
                                  </div>
                  </td>
                  <td className="currencyAlign">
                            <label htmlFor="qty">Quantity:</label>              
                            <input type="number" id="qty" name="qty" min="0" className="input"></input>
                  </td>
                  <td className="currencyAlign">
                            <button type="button" onClick={e => {
                              // console.log(this.state.selectedSrc);
                              // console.log(this.state.selectedDst);
                              // console.log(document.getElementById("qty").value);
                              var dt = this.state.startDate.getFullYear().toString() + "-" + this.state.startDate.getMonth().toString() + "-" + this.state.startDate.getDay().toString();
                              axios({
                                "method":"GET",
                                "url":"https://currency-converter5.p.rapidapi.com/currency/historical/"+dt,
                                "headers":{
                                "content-type":"application/octet-stream",
                                "x-rapidapi-host":"currency-converter5.p.rapidapi.com",
                                "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
                                "useQueryString":true
                                },"params":{
                                "format":"json",
                                "from":this.state.selectedSrc,
                                "to":this.state.selectedDst,
                                "amount": document.getElementById("qty").value,
                                }
                                })
                                .then((response)=>{
                                  // console.log(response);
                                  // console.log("===");
                                  // console.log(response.data.rates[this.state.selectedDst]['rate']);
                                  var el = document.getElementById("result");
                                  var tbl = document.createElement("table");
                                  var tb = document.createElement("tbody");
                                  var tr = document.createElement("tr");
                                  var td = document.createElement("td");
                                  var code = document.createTextNode("Currency Code: " + this.state.selectedDst);
                                  td.appendChild(code);
                                  tr.appendChild(td);
                                  tb.appendChild(tr);
                                  tbl.appendChild(tb);
                                  var rate = document.createTextNode("Rate: "+response.data.rates[this.state.selectedDst]['rate']);
                                  var tr1 = document.createElement("tr");
                                  var td1 = document.createElement("td");
                                  td1.appendChild(rate);
                                  tr1.appendChild(td1);
                                  tbl.appendChild(tr1);
                                  var rate_for_amount = document.createTextNode("Rate for Amount: " + response.data.rates[this.state.selectedDst]['rate_for_amount']);
                                  var tr2 = document.createElement("tr");
                                  var td2 = document.createElement("td");
                                  td2.appendChild(rate_for_amount);
                                  tr2.appendChild(td2);
                                  tbl.appendChild(tr2);
                                  el.appendChild(tbl);
                                })
                                .catch((error)=>{
                                  console.log(error)
                                })

                            }} className="btn btn-success">Convert</button>
                  </td>
                  </tr></tbody>
                </table>
                <div className="convertResult" id="result"></div>
          </div>
        );
    }
}

export default Homepage;

