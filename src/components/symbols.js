import React from 'react'
import axios from 'axios'
import Data from '../components/data'

//import { render } from '@testing-library/react'
// Reference: https://alligator.io/react/axios-react/

class Symbols extends React.Component {
    state = {
        syms: [],
        selectedSymbol: "",
        validationError: ""
    }

    componentDidMount() {
        axios({
            "method": "GET",
            "url": "https://finnhub-realtime-stock-price.p.rapidapi.com/stock/symbol",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "finnhub-realtime-stock-price.p.rapidapi.com",
                "x-rapidapi-key":process.env.REACT_APP_RAPIDAPI_KEY
            }, "params": {
                "exchange": "US"
            }
        })
        .then(response => {
            return response.data;
        })
            .then(data => {
                console.log(data);
                let symbolsFromApi = data.map((symbol, index)=>{
                    return {key: index, value: symbol.symbol, display: symbol.displaySymbol}
                });
               this.setState({
                   syms: [
                       {key: 0, value: "",
                       display: "(Select a symbol)"}
                   ].concat(symbolsFromApi)
                   });
            })
            .catch((error) => {
                console.log(error)
            })
        }

    render() {
        return (
            <div>
            <select
              value={this.state.selectedSymbol}
              onChange={e =>
                this.setState({
                    selectedSymbol: e.target.value,
                  validationError:
                    e.target.value === ""
                      ? "You must select a symbol"
                      : ""
                })
              }
            >
              {this.state.syms.map((symbol,index) => (
                <option
                  key={index}
                  value={symbol.value}
                >
                  {symbol.display}
                </option>
              ))}
            </select>
            <div
              style={{
                color: "red",
                marginTop: "5px"
              }}
            >
              {this.state.validationError}
            </div>
            <Welcome name={this.state.selectedSymbol} />
          </div>

        );
    }
}

function Welcome(props) {
    if(props.name != "")
        return (
            <>
        <h1>Hello!!!, {props.name}</h1>
        <Data />
        </>
            );
    else
        return <h1></h1>;
}

export default Symbols