// https://www.freecodecamp.org/news/chart-the-stock-market-with-react-redux-react-vis-and-socket-io-18caf312693c/

import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
const axios = require("axios");

class CryptoPlot extends Component {
    state = {
        data_c: {},
        data_h: {},
        data_l: {},
        data_o: {},
        data_t: {},
        data_v: {},
        params: []
    }

    componentDidMount() {
        let {dataId} = this.props;
        console.log('did mount:)' + dataId);
        axios({
            "method":"GET",
            "url":"https://coingecko.p.rapidapi.com/coins/"+dataId+"/market_chart/range",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"coingecko.p.rapidapi.com",
            "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
            "useQueryString":true
            },"params":{
            "from":"1392577232",
            "vs_currency":"USD",
            "to":"1590701940"
            }
            })
            .then((response)=>{
            console.log(response.data);
            this.setState({data_c: response.data});
            })
            .catch((error)=>{
            console.log(error)
            })
        // axios({
        //     "method":"GET",
        //     "url":"https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle",
        //     "headers":{
        //     "content-type":"application/octet-stream",
        //     "x-rapidapi-host":"finnhub-realtime-stock-price.p.rapidapi.com",
        //     "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668"
        //     },"params":{
        //     "to":"1575243390",
        //     "symbol":"AAPL",
        //     "from":"1572651390",
        //     "resolution":"D"
        //     }
        //     })
        //     .then((response)=>{
        //       return response;
        //     })
        //     .then(data => {
        //         //console.log(data);
        //         let dataFromApi = [];
        //         for(let i=0; i<data.data['c'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['c'][i]});
        //         }
        //         //console.log('data_c: '+dataFromApi);
        //         this.setState({data_c: dataFromApi});

        //         dataFromApi = [];
        //         for(let i=0; i<data.data['h'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['h'][i]});
        //         }
        //         //console.log('data_h: '+dataFromApi);
        //         this.setState({data_h: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['l'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['l'][i]});
        //         }
        //         //console.log('data_l: '+dataFromApi);
        //         this.setState({data_l: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['o'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['o'][i]});
        //         }
        //         //console.log('data_o: '+dataFromApi);
        //         this.setState({data_o: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['t'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['t'][i]});
        //         }
        //         //console.log('data_t: '+dataFromApi);
        //         this.setState({data_t: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['v'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['v'][i]});
        //         }
        //         //console.log('data_v: '+dataFromApi);
        //         this.setState({data_v: dataFromApi});
        //     })
        //     .catch((error)=>{
        //       console.log(error)
        //     })
    }

    componentDidUpdate(prevProps){
        let {dataId} = this.props;
        console.log('did mount' + dataId);
        if (this.props.dataId !== prevProps.dataId) {
            axios({
                "method":"GET",
                "url":"https://coingecko.p.rapidapi.com/coins/"+dataId+"/market_chart/range",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"coingecko.p.rapidapi.com",
                "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
                "useQueryString":true
                },"params":{
                "from":"1392577232",
                "vs_currency":"USD",
                "to":"1590701940"
                }
                })
                .then((response)=>{
                console.log(response.data);
                this.setState({data_c: response.data});
                })
                .catch((error)=>{
                console.log(error)
                })
        // axios({
        //     "method":"GET",
        //     "url":"https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle",
        //     "headers":{
        //     "content-type":"application/octet-stream",
        //     "x-rapidapi-host":"finnhub-realtime-stock-price.p.rapidapi.com",
        //     "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668"
        //     },"params":{
        //     "to":"1575243390",
        //     "symbol":dataId,
        //     "from":"1572651390",
        //     "resolution":"D"
        //     }
        //     })
        //     .then((response)=>{
        //       return response;
        //     })
        //     .then(data => {
        //         //console.log(data);
        //         let dataFromApi = [];
        //         for(let i=0; i<data.data['c'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['c'][i]});
        //         }
        //         //console.log('data_c: '+dataFromApi);
        //         this.setState({data_c: dataFromApi});
    
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['h'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['h'][i]});
        //         }
        //         //console.log('data_h: '+dataFromApi);
        //         this.setState({data_h: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['l'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['l'][i]});
        //         }
        //         //console.log('data_l: '+dataFromApi);
        //         this.setState({data_l: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['o'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['o'][i]});
        //         }
        //         //console.log('data_o: '+dataFromApi);
        //         this.setState({data_o: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['t'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['t'][i]});
        //         }
        //         //console.log('data_t: '+dataFromApi);
        //         this.setState({data_t: dataFromApi});
        //         dataFromApi = [];
        //         for(let i=0; i<data.data['v'].length; i++) {
        //             dataFromApi.push({x:i, y:data.data['v'][i]});
        //         }
        //         //console.log('data_v: '+dataFromApi);
        //         this.setState({data_v: dataFromApi});
        //     })
        //     .catch((error)=>{
        //       console.log(error)
        //     })
        }
    }


  render() {
    let {dataId} = this.props;
    console.log(dataId);
    let data_c = [];
    let data_h = [];
    let data_l = [];
    let data_o = [];
    let data_t = [];
    let data_v = [];
    //   {x: 0, y: 8},
    //   {x: 1, y: 5},
    //   {x: 2, y: 4},
    //   {x: 3, y: 9},
    //   {x: 4, y: 1},
    //   {x: 5, y: 7},
    //   {x: 6, y: 6},
    //   {x: 7, y: 3},
    //   {x: 8, y: 2},
    //   {x: 9, y: 0}
    // ];
    // const m = new Map();
    // Object.keys(this.state.data).forEach(k => {m.set(k, this.state.data[k])});
    // console.log(m.keys());
    // for(var i=0; i<20; i++) {
    //     console.log(i, this.state.data['c']);
    //     data.push({x:i, y:this.state.data['c'][i]});
    // }

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
    //console.log('c'+data_c);
    //console.log('h'+data_h);
    //console.log('l'+data_l);
    //console.log('o'+data_o);
    console.log('t'+data_t);
    console.log('v'+data_v);
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
          {/* <ChartLabel text="Days"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.525}
                yPercent={1.18} 
                style={{text: {color: "red"}}}/>
          <ChartLabel text="Prices"
                className="alt-y-label"
                includeMargin={false}
                xPercent={-0.05}
                yPercent={0.58} /> */}
          <LineSeries data={data_c} />
          <LineSeries data={data_h} />
          <LineSeries data={data_l} />
          <LineSeries data={data_o} />
        </XYPlot>
      </div>
    );
  }
}

export default CryptoPlot;
