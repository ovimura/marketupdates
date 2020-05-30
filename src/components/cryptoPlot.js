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

    componentDidMount() {
      console.log("mount")
        let {dataId} = this.props;
        console.log('did mount:)' + dataId);
        console.log("https://coingecko.p.rapidapi.com/coins/"+dataId+"/market_chart/range");
        axios({
            "method":"GET",
            "url":"https://coingecko.p.rapidapi.com/coins/"+dataId.toLowerCase()+"/market_chart/range",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"coingecko.p.rapidapi.com",
            "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
            "useQueryString":true
            },"params":{
            "from":"1392577232",
            "vs_currency":"USD",
            "to":"1590824006"
            }
            })
            .then((response)=> {
              console.log(response.data);
              var marketCapsFromApi = [];
              for(let i=0; i<response.data['market_caps'].length; i++) {
                marketCapsFromApi.push({x:((response.data['market_caps'][i][0]/1000)|0), y:response.data['market_caps'][i][1]});
              }
              this.setState({market_caps: marketCapsFromApi});
              var pricesFromApi = [];
              for(let i=0; i<response.data['prices'].length; i++) {
                pricesFromApi.push({x:((response.data['prices'][i][0]/1000)|0), y:response.data['prices'][i][1]});
              }
              this.setState({prices: pricesFromApi});
              var totalValumesFromApi = [];
              for(let i=0; i<response.data['total_volumes'].length; i++) {
                totalValumesFromApi.push({x:((response.data['total_volumes'][i][0]/1000)|0), y:response.data['total_volumes'][i][1]});
              }
              this.setState({total_volumes: totalValumesFromApi});
              console.log(this.state.prices);
            })
            .catch((error)=>{
              console.log(error)
            })
    }

    componentDidUpdate(prevProps){
        let {dataId} = this.props;
        console.log('did mount, update: ' + dataId);
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
                "from":"1390577232",
                "vs_currency":"USD",
                "to":"1590824006"
                }
                })
                .then((response)=>{
                console.log(response);
                // let dataFromApi = [];
                // for(let i=0; i<response.data['market_caps'].length; i++) {
                //   dataFromApi.push({x:((response.data['market_caps'][i][0]/1000)|0), y:response.data['market_caps'][i][1]});
                // }
                // this.setState({market_caps: dataFromApi});

                var marketCapsFromApi = [];
                for(let i=0; i<response.data['market_caps'].length; i++) {
                  marketCapsFromApi.push({x:((response.data['market_caps'][i][0]/1000)|0), y:response.data['market_caps'][i][1]});
                }
                this.setState({market_caps: marketCapsFromApi});
                var pricesFromApi = [];
                for(let i=0; i<response.data['prices'].length; i++) {
                  pricesFromApi.push({x:((response.data['prices'][i][0]/1000)|0), y:response.data['prices'][i][1]});
                }
                this.setState({prices: pricesFromApi});
                var totalValumesFromApi = [];
                for(let i=0; i<response.data['total_volumes'].length; i++) {
                  totalValumesFromApi.push({x:((response.data['total_volumes'][i][0]/1000)|0), y:response.data['total_volumes'][i][1]});
                }
                this.setState({total_volumes: totalValumesFromApi});
                console.log(this.state.prices);



                })
                .catch((error)=>{
                  console.log(error)
                })
        }
    }


  render() {
    let {dataId} = this.props;
    console.log(dataId);
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
    // const { series } = {series:[{title: "market caps", data:market_caps['x']}, {title: "prices", data:prices['x']}, {title: "total volume", data:total_volumes['x']}]}
    const { series1 } = {series1:[{title: "prices", data:prices['y']}]}
    const { series2 } = {series2:[{title: "market caps", data:market_caps['y']}]}
    const { series3 } = {series3:[{title: "total volumes", data:total_volumes['y']}]}
    console.log(market_caps);
    console.log('market_cap');
    console.log(prices);
    console.log('prices');
    console.log(total_volumes);
    console.log('total_volumes');
    return (
      <div className="Plot">
        <table>
          <tr><td className="chart1">
            <XYPlot height={300} width={400} margin={{left: 100}}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Days" style={{
                line: {stroke: 'black'},
                ticks: {stroke: '#ADDDE1'},
                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                title: {fontSize: "12px", fill:"black", fontWeight: 600},
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
            <DiscreteColorLegend
              onItemClick={this.clickHandler}
              width={180}
              items={series1}
            />

                {/* <LineSeries data={market_caps} /> */}
                <LineSeries data={prices} />
                {/* <LineSeries data={total_volumes} /> */}
              {/* <LineSeries data={data_h} />
              <LineSeries data={data_l} />
              <LineSeries data={data_o} /> */}
            </XYPlot>
            </td> <td className="chart2">
            <XYPlot height={300} width={400} margin={{left: 100}}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Days" style={{
                line: {stroke: 'black'},
                ticks: {stroke: '#ADDDE1'},
                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                title: {fontSize: "12px", fill:"black", fontWeight: 600},
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
            <DiscreteColorLegend
              onItemClick={this.clickHandler}
              width={180}
              items={series2}
            />

                {/* <LineSeries data={market_caps} /> */}
                <LineSeries data={market_caps} />
                {/* <LineSeries data={total_volumes} /> */}
              {/* <LineSeries data={data_h} />
              <LineSeries data={data_l} />
              <LineSeries data={data_o} /> */}
            </XYPlot>
            </td>
            <td className="chart3">
            <XYPlot height={300} width={400} margin={{left: 100}}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Days" style={{
                line: {stroke: 'black'},
                ticks: {stroke: '#ADDDE1'},
                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, color: '#6b6b76', fontSize: "12px"},
                title: {fontSize: "12px", fill:"black", fontWeight: 600},
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
            <DiscreteColorLegend
              onItemClick={this.clickHandler}
              width={180}
              items={series3}
            />

                {/* <LineSeries data={market_caps} /> */}
                <LineSeries data={total_volumes} />
                {/* <LineSeries data={total_volumes} /> */}
              {/* <LineSeries data={data_h} />
              <LineSeries data={data_l} />
              <LineSeries data={data_o} /> */}
            </XYPlot>
            </td>
            </tr>
            </table>
      </div>
    );
  }
}

export default CryptoPlot;
