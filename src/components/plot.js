// https://www.freecodecamp.org/news/chart-the-stock-market-with-react-redux-react-vis-and-socket-io-18caf312693c/

import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, DiscreteColorLegend} from 'react-vis';
const axios = require("axios");

class Plot extends Component {
    state = {
        data_c: {},
        data_h: {},
        data_l: {},
        data_o: {},
        params: []
    }
from = "";
to = "";
componentDidMount() {
    let {from, to} = this.props
    this.from = from
    this.to = to
    console.log('from:');
    console.log(from);
    console.log('to');
    console.log(to);
    axios({
        "method":"GET",
        "url":"https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"finnhub-realtime-stock-price.p.rapidapi.com",
        "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668"
        },"params":{
        "to": to.toString(), //"1575243390",
        "symbol":"AAPL",
        "from": from.toString(), //"1572651390",
        "resolution":"D"
        }
        })
        .then((response)=>{
          return response;
        })
        .then(data => {
            console.log(data);
            let dataFromApi = [];
            for(let i=0; i<data.data['c'].length; i++) {
                dataFromApi.push({x:i, y:data.data['c'][i]});
            }
            //console.log('data_c: '+dataFromApi);
            this.setState({data_c: dataFromApi});

            dataFromApi = [];
            for(let i=0; i<data.data['h'].length; i++) {
                dataFromApi.push({x:i, y:data.data['h'][i]});
            }
            //console.log('data_h: '+dataFromApi);
            this.setState({data_h: dataFromApi});
            dataFromApi = [];
            for(let i=0; i<data.data['l'].length; i++) {
                dataFromApi.push({x:i, y:data.data['l'][i]});
            }
            //console.log('data_l: '+dataFromApi);
            this.setState({data_l: dataFromApi});
            dataFromApi = [];
            for(let i=0; i<data.data['o'].length; i++) {
                dataFromApi.push({x:i, y:data.data['o'][i]});
            }
            //console.log('data_o: '+dataFromApi);
            this.setState({data_o: dataFromApi});
            dataFromApi = [];
            for(let i=0; i<data.data['t'].length; i++) {
                dataFromApi.push({x:i, y:data.data['t'][i]});
            }
            //console.log('data_t: '+dataFromApi);
            this.setState({data_t: dataFromApi});
            dataFromApi = [];
            for(let i=0; i<data.data['v'].length; i++) {
                dataFromApi.push({x:i, y:data.data['v'][i]});
            }
            //console.log('data_v: '+dataFromApi);
            this.setState({data_v: dataFromApi});
        })
        .catch((error)=>{
          console.log(error)
        })
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate');
        let {dataId} = this.props;
        let {from, to} = this.props;
        console.log(from);
        console.log(prevProps.from);
        console.log(to);
        console.log(prevProps.to);;
        if (this.props.dataId !== prevProps.dataId) {
        axios({
            "method":"GET",
            "url":"https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"finnhub-realtime-stock-price.p.rapidapi.com",
            "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668"
            },"params":{
            "to":to.toString(),
            "symbol":dataId,
            "from":from.toString(),
            "resolution":"D"
            }
            })
            // .then((response)=>{
            //   console.log(response);
            // })
            .then(data => {
                console.log('data in updated');
                console.log(data);
                let dataFromApi = [];
                for(let i=0; i<data.data['c'].length; i++) {
                    dataFromApi.push({x:i, y:data.data['c'][i]});
                }
                //console.log('data_c: '+dataFromApi);
                this.setState({data_c: dataFromApi});
    
                dataFromApi = [];
                for(let i=0; i<data.data['h'].length; i++) {
                    dataFromApi.push({x:i, y:data.data['h'][i]});
                }
                //console.log('data_h: '+dataFromApi);
                this.setState({data_h: dataFromApi});
                dataFromApi = [];
                for(let i=0; i<data.data['l'].length; i++) {
                    dataFromApi.push({x:i, y:data.data['l'][i]});
                }
                //console.log('data_l: '+dataFromApi);
                this.setState({data_l: dataFromApi});
                dataFromApi = [];
                for(let i=0; i<data.data['o'].length; i++) {
                    dataFromApi.push({x:i, y:data.data['o'][i]});
                }
                //console.log('data_o: '+dataFromApi);
                this.setState({data_o: dataFromApi});
                dataFromApi = [];
                for(let i=0; i<data.data['t'].length; i++) {
                    dataFromApi.push({x:i, y:data.data['t'][i]});
                }
                //console.log('data_t: '+dataFromApi);
                this.setState({data_t: dataFromApi});
                dataFromApi = [];
                for(let i=0; i<data.data['v'].length; i++) {
                    dataFromApi.push({x:i, y:data.data['v'][i]});
                }
                //console.log('data_v: '+dataFromApi);
                this.setState({data_v: dataFromApi});
            })
            .catch((error)=>{
              console.log(error)
            })
        }
    }

    renderSeries(data_h) {
        var t = [];
        data_h.forEach(element => {
            t.push(element['y']);
        });
        if(data_h.length >0) {
            const { series2 } = {series2:[{title: "stock prices", data:t}]}
            return(<DiscreteColorLegend onItemClick={this.clickHandler} width={280} items={series2} />)
        }
    }


  render() {
    let data_c = [];
    let data_h = [];
    let data_l = [];
    let data_o = [];
    for(let i=0; i<this.state.data_c.length; i++) {
        data_c.push(this.state.data_c[i]);
    }
    for(let i=0; i<this.state.data_h.length; i++) {
        data_h.push(this.state.data_h[i]);
    }
    for(let i=0; i<this.state.data_l.length; i++) {
        data_l.push(this.state.data_l[i]);
    }
    for(let i=0; i<this.state.data_o.length; i++) {
        data_o.push(this.state.data_o[i]);
    }
    const { series1 } = {series1:[{title: "close price", data:data_c, color: "red"}]}
    const { series2 } = {series2:[{title: "high price", data:data_h, color: "orange"}]}
    const { series3 } = {series3:[{title: "low price", data:data_l, color: "blue"}]}
    const { series4 } = {series4:[{title: "open price", data:data_o, color: "green"}]}
    return (
      <div className="Plot">
        <XYPlot height={300} width={700}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Days" style={{
            line: {stroke: 'black'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
            title: {fontSize: "12px", fill:"black", fontWeight: 600}
          }} />
          <YAxis title="Prices" color="red" style={{
            line: {stroke: 'black'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
            title: {fontSize: "12px", fill:"black", fontWeight: 600}
          }} />
            <LineSeries color="red" data={data_c} />
            <DiscreteColorLegend width={280} items={series1} />

            <LineSeries color="orange" data={data_h} />
            <DiscreteColorLegend width={280} items={series2} />

            <LineSeries color="blue" data={data_l} />
            <DiscreteColorLegend width={280} items={series3} />

            <LineSeries color="green" data={data_o} />
            <DiscreteColorLegend width={280} items={series4} />
        </XYPlot>
      </div>
    );
  }
}

export default Plot;
