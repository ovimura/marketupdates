import Plot from 'react-plotly.js';
import React from 'react';

// import React, { useEffect, useState, Component } from 'react';

import GetData from '../poly/get';

class CandleStick extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.setData = this.setData.bind(this);
  }

  setData(d) {
    console.log(d);
    this.setState(d);
    console.log(this.state);
  }

  render() {
    let o = [1, 2, 3, 4, 5, 6, 2];
    let h = [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 2.5];
    let l = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 1.5];
    let c = [1.2, 2.3, 3.1, 4.4, 5.0, 6.2, 1.9];
    let xx = [
      '2023-10-20',
      '2023-10-21',
      '2023-10-22',
      '2023-10-23',
      '2023-10-24',
      '2023-10-25',
      '2023-10-26',
    ];
    let yy = [1000000, 1500000, 1200000, 1700000, 1600000, 4000000, 6900222];
    // let y = [];
    try {
      if (this.state !== null) {
        o = this.state
          ? Object.keys(this.state).map((k) => this.state[k]['o'])
          : [1, 2, 3, 4, 5, 6, 2];
        console.log(o);
        h = this.state
          ? Object.keys(this.state).map((k) => this.state[k]['h'])
          : [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 2.5];
        l = this.state
          ? Object.keys(this.state).map((k) => this.state[k]['l'])
          : [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 1.5];
        c = this.state
          ? Object.keys(this.state).map((k) => this.state[k]['c'])
          : [1.2, 2.3, 3.1, 4.4, 5.0, 6.2, 1.9];
        xx = this.state
          ? Object.keys(this.state).map((k) => this.state[k]['t'])
          : [
              '2023-10-20',
              '2023-10-21',
              '2023-10-22',
              '2023-10-23',
              '2023-10-24',
              '2023-10-25',
              '2023-10-26',
            ];
        yy = this.state
          ? Object.keys(this.state).map((k) => this.state[k]['v'])
          : [1000000, 1500000, 1200000, 1700000, 1600000, 4000000, 6900222];
      }
    } catch (error) {
      console.log(error);
    }

    return (
      <div
        className=""
        style={{
          display: 'flex',
          justifyContent: 'top',
          alignItems: 'top',
          height: '100vh',
          marginTop: '10px',
          flexDirection: 'column',
          paddingBottom: '300px',
        }}
      >
        <Plot
          data={[
            {
              // x: [
              //   '2023-10-20',
              //   '2023-10-21',
              //   '2023-10-22',
              //   '2023-10-23',
              //   '2023-10-24',
              //   '2023-10-25',
              //   '2023-10-26',
              // ],
              x: xx,
              // open: [1, 2, 3, 4, 5, 6, 2],
              open: o,
              // high: [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 2.5],
              high: h,
              // low: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 1.5],
              low: l,
              // close: [1.2, 2.3, 3.1, 4.4, 5.0, 6.2, 1.9],
              close: c,
              type: 'candlestick',
              xaxis: 'x',
              yaxis: 'y',
              increasing: { line: { color: 'black' } },
              decreasing: { line: { color: 'red' } },
            },
            {
              // x: [
              //   '2023-10-20',
              //   '2023-10-21',
              //   '2023-10-22',
              //   '2023-10-23',
              //   '2023-10-24',
              //   '2023-10-25',
              //   '2023-10-26',
              // ],
              x: xx,
              // y: [
              //   1000000, 1500000, 1200000, 1700000, 1600000, 4000000, 6900222,
              // ],
              y: yy,
              type: 'bar',
              marker: { color: 'rgba(0, 0, 150, 0.5)' },
              xaxis: 'x',
              yaxis: 'y2',
            },
          ]}
          layout={{
            grid: { rows: 2, columns: 1, roworder: 'bottom to top' },
            dragmode: 'zoom',
            xaxis: { type: 'category' },
            yaxis: { title: 'Price', domain: [0.35, 1] }, // Top chart occupies more space
            yaxis2: { title: 'Volume', domain: [0, 0.25] }, // Bottom chart is smaller
            showlegend: false,
            height: 750, // Adjust height if needed
            width: Math.round(window.innerWidth * 0.8),
          }}
          config={{ displaylogo: false }}
        />
        <span>
          <GetData setData={this.setData} />
        </span>
        <span style={{ paddingBottom: '200px' }}>
          Data: {JSON.stringify(this.state)} |
        </span>
        <span>o: {o}</span>
        <span>o: {h}</span>
      </div>
    );
  }
}

export default CandleStick;
