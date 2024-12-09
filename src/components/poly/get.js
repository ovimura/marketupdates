import React from 'react';

class GetData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: null,
      error: null,
    };
  }

  fetchStockData = async () => {
    // const apiKey = '53o7q256FABZDsJjyKIYAc3UIHLR_u1A'; // Replace with your API key

    try {
      let response = null;
      // await fetch(
      //   `https://api.polygon.io/v1/open-close/AAPL/2023-12-01?apiKey=${apiKey}`
      // );

      let r = await fetch(
        'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=53o7q256FABZDsJjyKIYAc3UIHLR_u1A'
      );
      response = r;
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      this.setState({ stockData: data['results'] });
      this.props.setData(data['results']);
      console.log(this.props);
    } catch (error) {
      this.setState({ error: error.message });
      console.error('Error fetching stock data:', error);
    }
  };

  componentDidMount() {
    this.fetchStockData();
  }

  render() {
    const { stockData, error } = this.state;

    return (
      <div>
        <h1>Stock Data for AAPL</h1>
        {error && <p>Error: {error}</p>}
        <pre>
          {stockData ? JSON.stringify(stockData, null, 2) : 'Loading...'}
        </pre>
      </div>
    );
  }
}

export default GetData;
