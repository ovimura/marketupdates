import React, { Component } from 'react';
// import Symbols from './symbols';

import CandleStick from './candlestick';

class Stocks extends Component {
  render() {
    let { dataId } = this.props.match.params;
    if (dataId === undefined) dataId = 'AAPL';

    return (
      <div
        className="container-fluid"
        role="main"
        style={{ paddingBottom: '300px', marginBottom: '300px' }}
      >
        <h1>Stock Markets</h1>
        <p>
          Please select a Stock Market symbol from the following drop-down
          field:
        </p>
        <CandleStick />
      </div>
    );
  }
}

export default Stocks;
