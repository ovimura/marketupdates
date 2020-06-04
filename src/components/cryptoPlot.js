// https://www.freecodecamp.org/news/chart-the-stock-market-with-react-redux-react-vis-and-socket-io-18caf312693c/

import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, DiscreteColorLegend, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
const axios = require("axios");

class CryptoPlot extends Component {
    state = {
        market_caps: {},
        prices: {},
        total_volumes: {},
        params: []
    }

    market_caps_range = [];
    prices_range = [];
    total_volumes = [];

    from = 0;
    to = 0;
    updated = false;
    componentDidMount() {
      var f = 0, t =0;
      if(this.props.from !== this.from && this.props.to !== this.to) {
        this.from = this.props.from;
        this.to = this.props.to;
        f = this.props.from;
        t = this.props.to;
      } else {
        f = "1392577232";
        t = "1590824006";
      }
        let {dataId} = this.props;
        axios({
            "method":"GET",
            "url":"https://coingecko.p.rapidapi.com/coins/"+dataId.toLowerCase()+"/market_chart/range",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"coingecko.p.rapidapi.com",
            "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
            "useQueryString":true
            },"params":{
            "from": f.toString(),
            "vs_currency":"USD",
            "to": t.toString()
            }
            })
            .then((response)=> {
              var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              var date = new Date(response.data['market_caps'][0][0]);
              var yr = Math.trunc(date.getFullYear());
              var m = months[date.getMonth()];
              var d = date.getDate();
              var start = (d+" "+m+", "+yr);
              this.market_caps_range.push(start);

              var date1 = new Date(response.data['market_caps'][response.data['market_caps'].length-1][0]);
              var yr1 = Math.trunc(date1.getFullYear());
              var m1 = months[date1.getMonth()];
              var d1 = date1.getUTCDate();
              var end1 = (d1+" "+m1+", "+yr1);
              this.market_caps_range.push(end1);


              var date2 = new Date(response.data['prices'][0][0]);
              var yr2 = Math.trunc(date2.getFullYear());
              var m2 = months[date2.getMonth()];
              var d2 = date2.getDate();
              var start2 = (d2+" "+m2+", "+yr2);
              this.prices_range.push(start2);
              var date3 = new Date(response.data['prices'][response.data['prices'].length-1][0]);
              var yr3 = Math.trunc(date3.getFullYear());
              var m3 = months[date3.getMonth()];
              var d3 = date3.getUTCDate();
              var end3 = (d3+" "+m3+", "+yr3);
              this.prices_range.push(end3);

              var date4 = new Date(response.data['total_volumes'][0][0]);
              var yr4 = Math.trunc(date4.getFullYear());
              var m4 = months[date4.getMonth()];
              var d4 = date4.getDate();
              var start4 = (d4+" "+m4+", "+yr4);
              this.total_volumes.push(start4);

              var date5 = new Date(response.data['total_volumes'][response.data['total_volumes'].length-1][0]);
              var yr5 = Math.trunc(date5.getFullYear());
              var m5 = months[date5.getMonth()];
              var d5 = date5.getUTCDate();
              var end5 = (d5+" "+m5+", "+yr5);
              this.total_volumes.push(end5);

              var marketCapsFromApi = [];
              for(let i=0; i<response.data['market_caps'].length; i++) {
                marketCapsFromApi.push({x:i, y:response.data['market_caps'][i][1]});
              }
              this.setState({market_caps: marketCapsFromApi});
              var pricesFromApi = [];
              for(let i=0; i<response.data['prices'].length; i++) {
                pricesFromApi.push({x:i, y:response.data['prices'][i][1]});
              }
              this.setState({prices: pricesFromApi});
              var totalValumesFromApi = [];
              for(let i=0; i<response.data['total_volumes'].length; i++) {
                totalValumesFromApi.push({x:i, y:response.data['total_volumes'][i][1]});
              }
              this.setState({total_volumes: totalValumesFromApi});
            })
            .catch((error)=>{
              console.log(error)
              this.display = false;
            })
    }

    componentDidUpdate(prevProps) {
        var f = 0, t =0;
        if(this.props.from !== 0 && this.props.to !== 0) {
          this.from = this.props.from;
          this.to = this.props.to;
          f = this.props.from;
          t = this.props.to;
        } else {
          f = "1392577232";
          t = "1590824006";
        }
        if ((this.props.dataId !== prevProps.dataId)) {
          this.updated = false;
            axios({
                "method":"GET",
                "url":"https://coingecko.p.rapidapi.com/coins/"+this.props.dataId+"/market_chart/range",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"coingecko.p.rapidapi.com",
                "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
                "useQueryString":true
                },"params":{
                "from":f.toString(),
                "vs_currency":"USD",
                "to":t.toString()
                }
                })
                .then((response) => {
                  if(response.data['market_caps'].length > 0) {
                    this.market_caps_range = [];
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var date = new Date(response.data['market_caps'][0][0]);
                    var yr = Math.trunc(date.getFullYear());
                    var m = months[date.getMonth()];
                    var d = date.getDate();
                    var start = (d+" "+m+", "+yr);
                    this.market_caps_range.push(start);

                    var date1 = new Date(response.data['market_caps'][response.data['market_caps'].length-1][0]);
                    var yr1 = Math.trunc(date1.getFullYear());
                    var m1 = months[date1.getMonth()];
                    var d1 = date1.getUTCDate();
                    var end1 = (d1+" "+m1+", "+yr1);
                    this.market_caps_range.push(end1);
                  }
                  if(response.data['prices'].length > 0) {
                    this.prices_range = [];
                    var date2 = new Date(response.data['prices'][0][0]);
                    var yr2 = Math.trunc(date2.getFullYear());
                    var m2 = months[date2.getMonth()];
                    var d2 = date2.getDate();
                    var start2 = (d2+" "+m2+", "+yr2);
                    this.prices_range.push(start2);
                    var date3 = new Date(response.data['prices'][response.data['prices'].length-1][0]);
                    var yr3 = Math.trunc(date3.getFullYear());
                    var m3 = months[date3.getMonth()];
                    var d3 = date3.getUTCDate();
                    var end3 = (d3+" "+m3+", "+yr3);
                    this.prices_range.push(end3);
                  }
                  if(response.data['total_volumes'].length > 0) {
                    this.total_volumes = [];
                    var date4 = new Date(response.data['total_volumes'][0][0]);
                    var yr4 = Math.trunc(date4.getFullYear());
                    var m4 = months[date4.getMonth()];
                    var d4 = date4.getDate();
                    var start4 = (d4+" "+m4+", "+yr4);
                    this.total_volumes.push(start4);
      
                    var date5 = new Date(response.data['total_volumes'][response.data['total_volumes'].length-1][0]);
                    var yr5 = Math.trunc(date5.getFullYear());
                    var m5 = months[date5.getMonth()];
                    var d5 = date5.getUTCDate();
                    var end5 = (d5+" "+m5+", "+yr5);
                    this.total_volumes.push(end5);
                  }

                  var marketCapsFromApi = [];
                  for(let i=0; i<response.data['market_caps'].length; i++) {
                    marketCapsFromApi.push({x:i, y:response.data['market_caps'][i][1]});
                  }
                  this.setState({market_caps: marketCapsFromApi});
                  var pricesFromApi = [];
                  for(let i=0; i<response.data['prices'].length; i++) {
                    pricesFromApi.push({x:i, y:response.data['prices'][i][1]});
                  }
                  this.setState({prices: pricesFromApi});
                  var totalValumesFromApi = [];
                  for(let i=0; i<response.data['total_volumes'].length; i++) {
                    totalValumesFromApi.push({x:i, y:response.data['total_volumes'][i][1]});
                  }
                  this.setState({total_volumes: totalValumesFromApi});
                })
                .catch((error)=>{
                  console.log(error)
                })
        }
    }


  render() {
    let market_caps = [];
    let prices = [];
    let total_volumes = [];
    for(let i=0; i<this.state.market_caps.length; i++) {
        market_caps.push({x:this.state.market_caps[i]['x'], y:this.state.market_caps[i]['y']});
    }
    for(let i=0; i<this.state.prices.length; i++) {
      prices.push({x:this.state.prices[i]['x'], y:this.state.prices[i]['y']});
    }
    for(let i=0; i<this.state.total_volumes.length; i++) {
      total_volumes.push({x:this.state.total_volumes[i]['x'], y:this.state.total_volumes[i]['y']});
    }
    const { series1 } = {series1:[{title: "prices (" + this.prices_range[0] + " to " + this.prices_range[1] + ")", data:prices['y']}]}
    const { series2 } = {series2:[{title: "market caps (" + this.market_caps_range[0] + " to " + this.market_caps_range[1] + ")", data:market_caps['y']}]}
    const { series3 } = {series3:[{title: "total volumes (" + this.total_volumes[0] + " to " + this.total_volumes[1] + ")", data:total_volumes['y']}]}
    return (
      <>
      <div className="Plot">
        <table>
          <tbody>
            <tr>
              <td className="chart1">
              <span style={{paddingLeft:"220px", fontWeight:900}}>PRICES</span>
              <XYPlot height={300} width={400} margin={{left: 100}}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="No of samples/hr" style={{
                  line: {stroke: 'black'},
                  ticks: {stroke: '#ADDDE1'},
                  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                  title: {fontSize: "12px", fill:"black", fontWeight: 600},
                }} />
                <YAxis title="Price ($)" color="red" style={{
                  line: {stroke: 'black'},
                  ticks: {stroke: '#ADDDE1'},
                  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                  title: {fontSize: "12px", fill:"black", fontWeight: 600}
                }} />
                <DiscreteColorLegend
                  onItemClick={this.clickHandler}
                  width={280}
                  items={series1}
                />
                <LineSeries data={prices} />
              </XYPlot>
              </td>
              <td className="chart2">
              <span style={{paddingLeft:"200px", fontWeight:900}}>MARKET CAPS</span>
              <XYPlot height={300} width={400} margin={{left: 120}}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="No of Samples/hr" style={{
                  line: {stroke: 'black'},
                  ticks: {stroke: '#ADDDE1'},
                  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                  title: {fontSize: "12px", fill:"black", fontWeight: 600},
                }} />
                <YAxis title="Amount of $" color="red" style={{
                  line: {stroke: 'black'},
                  ticks: {stroke: '#ADDDE1'},
                  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                  title: {fontSize: "12px", fill:"black", fontWeight: 600}
                }} />
                <DiscreteColorLegend
                  onItemClick={this.clickHandler}
                  width={280}
                  items={series2}
                />
                <LineSeries data={market_caps} />
              </XYPlot>
              </td>
              <td className="chart3">
              <span style={{paddingLeft:"200px", fontWeight:900}}>TOTAL VOLUMES</span>
              <XYPlot height={300} width={400} margin={{left: 100}}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="No of Samples/hr" style={{
                  line: {stroke: 'black'},
                  ticks: {stroke: '#ADDDE1'},
                  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                  title: {fontSize: "12px", fill:"black", fontWeight: 600},
                }} />
                <YAxis title="Amount of $" color="red" style={{
                  line: {stroke: 'black'},
                  ticks: {stroke: '#ADDDE1'},
                  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                  title: {fontSize: "12px", fill:"black", fontWeight: 600}
                }} />
                <DiscreteColorLegend
                  onItemClick={this.clickHandler}
                  width={320}
                  items={series3}
                />
                <LineSeries data={total_volumes} />
              </XYPlot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </>
    );
  }
}

export default CryptoPlot;
