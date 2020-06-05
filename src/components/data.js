import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom';

const Data = ({pa}) => {
    let {dataId} = useParams();
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
               setQuote(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
   }, [dataId],[1])
    return (
        <div>
            {quote && <div style={{paddingLeft: "0px"}}>
                <table className="stocktable">
                    <caption className="quoteTitle" style={{width: "800px"}}>Quote as of {new Date(Number(quote.t)*1000).toDateString()} for {dataId.toUpperCase()}</caption>
                    <thead>
                    <tr>
                        <th className="stockth">Current</th>
                        <th className="stockth">High</th>
                        <th className="stockth">Low</th>
                        <th className="stockth">Open</th>
                        <th className="stockth">Previous Close</th>
                        <th className="stockth">Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="stocktd">{quote.c}</td>
                        <td className="stocktd">{quote.h}</td>
                        <td className="stocktd">{quote.l}</td>
                        <td className="stocktd">{quote.o}</td>
                        <td className="stocktd">{quote.pc}</td>
                        <td className="stocktd">{new Date(Number(quote.t)*1000).toLocaleTimeString()}</td>
                    </tr>
                    </tbody>
                </table>
            </div>}
            <br/>
        </div>
    )
}

export default Data
