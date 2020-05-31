import React from 'react'
import axios from 'axios'
import CryptoApi from '../components/cryptoApi'
import CryptoPlot from '../components/cryptoPlot'

class CryptoSymbols extends React.Component {
    state = {
        syms: [],
        selectedSymbol: "",
        symbolDescription: "",
        validationError: ""
    }
    componentDidMount() {
        console.log("CRYPTOCURRENCY");
        axios({
            "method":"GET",
            "url":"https://coingecko.p.rapidapi.com/coins/list",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"coingecko.p.rapidapi.com",
            "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
            "useQueryString":true
            }
            })
            .then((response)=>{
                var data = response.data;
              console.log(data)
                let symbolsFromApi = data.map((symbol, index)=>{
                    return {key: index, value: symbol.id, id: symbol.name, name: symbol.symbol}
                });
               this.setState({
                   syms: [
                       {key: 0, value: "(Select a <symbol",
                       id: "id", name: "name>)"}
                   ].concat(symbolsFromApi)
                   });
            })
            .catch((error)=>{
              console.log(error)
            });
        }

    render() {
        return (
            <div style={{}}>
            <select
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
                    {symbol.value}
                    :
                    {symbol.name}
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
            <DisplayDetails name={this.state.selectedSymbol} />
          </div>
        );
    }
}

function DisplayDetails(props) {
    if(props.name !== "") {
        return (
          <div style={{paddingLeft: "5%"}}>
            <CryptoApi pa={props.name}/>
            <CryptoPlot dataId={props.name} />
          </div>
            );
        } else
        return <br/>;
}





export default CryptoSymbols