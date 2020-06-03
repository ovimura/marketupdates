import React from 'react'
import axios from 'axios'
import Data from '../components/data'
import Plot from '../components/plot'
import DatePicker from "react-datepicker";
//import { render } from '@testing-library/react'

//import { render } from '@testing-library/react'
// Reference: https://alligator.io/react/axios-react/
// https://www.carlrippon.com/react-drop-down-data-binding/
class Symbols extends React.Component {
    state = {
        syms: [],
        selectedSymbol: "",
        symbolDescription: "",
        validationError: "",
        sDate: new Date(2020, new Date().getMonth()-1, new Date().getDay()),
        eDate: new Date()
    }
    dat = null;
    description = null;
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
                // console.log(data);
                this.dat = data;
                // console.log(this.dat[0].description, this.dat[0].symbol);
                let symbolsFromApi = data.map((symbol, index)=>{
                  //console.log(symbol.description);
                    return {key: index, value: symbol.symbol, display: symbol.displaySymbol, description: symbol.description}
                });
               this.setState({
                   syms: [
                       {key: 0, value: "",
                       display: "(Select a <symbol", description: "description>)"}
                   ].concat(symbolsFromApi)
                   });
            })
      .catch((error) => {
        console.log(error);
      })
    }

    handleChangeFrom = date => {
          this.setState({sDate: date})
          console.log(Number(this.state.sDate.valueOf().toString().substring(0,10)));
    }

    handleChangeTo = date => {
      this.setState({eDate: date})
    }

    render() {
        return (
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="stockAlign">
                    <label htmlFor="from">From:</label>
                    <DatePicker className="dateInput" id="from" name="from" selected={this.state.sDate} onChange={this.handleChangeFrom} />
                  </td>
                  <td className="stockAlign">
                  <label htmlFor="to">To:</label>
                    <DatePicker id="to" name="to" className="dateInput" selected={this.state.eDate} onChange={this.handleChangeTo} />
                  </td>
                  <td className="stockAlign">
                          <label htmlFor="stock">Stock:</label>
                          <select className="selectStock" id="stock" name="stock"
                      value={this.state.selectedSymbol}
                      onChange={e => {
                        this.setState({
                            selectedSymbol: e.target.value,
                          validationError:
                            e.target.value === ""
                              ? "You must select a symbol"
                              : ""
                        });
                      }
                      }>
                      {this.state.syms.map((symbol,index) => (
                        <option
                          key={index}
                          value={symbol.value}
                        >
                          {symbol.display}
                          :
                          {symbol.description}
                        </option>
                      ))}
                    </select>
                    <div
                      style={{
                        color: "red",
                        marginTop: "5px",
                        height: "20px"
                      }}
                    >
                      {this.state.validationError}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Welcome name={this.state.selectedSymbol} from={Number(this.state.sDate.valueOf().toString().substring(0,10))} to={Number(this.state.eDate.valueOf().toString().substring(0,10))} />
          </div>

        );
    }
}

function Welcome(props) {
    if(props.name !== "") {
        return (
          <div style={{paddingLeft: "0px"}}>
            <Data pa={props.name}/>
            <Plot dataId={props.name} from={props.from} to={props.to} />
          </div>
            );
        } else
        return <br/>;
}

export default Symbols
