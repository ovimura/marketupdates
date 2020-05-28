import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom';

const Data = ({pa}) => {
    let {dataId} = useParams();
    console.log(pa);
    if(pa !== undefined && dataId === undefined)
        dataId = pa;
    if(dataId === undefined)
        dataId = 'AAPL';
    let [quote, setQuote] = React.useState('')
       React.useEffect(() => {
        axios({
            "method": "GET",
            "url": "https://finnhub-realtime-stock-price.p.rapidapi.com/quote",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "finnhub-realtime-stock-price.p.rapidapi.com",
                "x-rapidapi-key":process.env.REACT_APP_RAPIDAPI_KEY
            }, "params": {
                "symbol": dataId.toUpperCase()
            }
        })
            .then((response) => {
                console.log(response);
               setQuote(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
   }, [dataId],[1])
    return (
        <div style={{}}>
            {/* <h2>Data View for {dataId.toString().toUpperCase()}</h2> */}
            {quote && <div style={{paddingLeft: "30px"}}>
                <table>
                    <caption>Quote as of {new Date(Number(quote.t)*1000).toDateString()} for {dataId.toUpperCase()}</caption>
                    <thead>
                    <tr>
                        <th>Current</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                        <th>Previous Close</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{quote.c}</td>
                        <td>{quote.h}</td>
                        <td>{quote.l}</td>
                        <td>{quote.o}</td>
                        <td>{quote.pc}</td>
                        <td>{new Date(Number(quote.t)*1000).toLocaleTimeString()}</td>
                    </tr>
                    </tbody>
                </table>
            </div>}
            <br/>
        </div>
    )
}

// const GetStockSymbols = () => {

//     let content;

//     const axios = require("axios");
//     axios({
//         "method":"GET",
//         "url":"https://finnhub-realtime-stock-price.p.rapidapi.com/stock/symbol",
//         "headers":{
//         "content-type":"application/octet-stream",
//         "x-rapidapi-host":"finnhub-realtime-stock-price.p.rapidapi.com",
//         "x-rapidapi-key":process.env.REACT_APP_RAPIDAPI_KEY
//         },"params":{
//         "exchange":"US"
//         }
//         })
//         .then((response)=>{
//             content = response.data;
//             console.log(content);
//         })
//         .catch((error)=>{
//         console.log(error)
//         })
//     return content;
// }

export default Data