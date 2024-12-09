// const { restClient } = require('@polygon.io/client-js');
import React, { useEffect, useState } from 'react';
import { restClient } from '@polygon.io/client-js';

function GetData() {
  const apiKey = '53o7q256FABZDsJjyKIYAc3UIHLR_u1A';
  // const rest = restClient(api_key);

  const [stockData, setStockData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    const client = restClient(apiKey);
    async function fetchStockData() {
      try {
        // Example: Fetch daily open/close for AAPL (Apple Inc.)
        const data = await client.stocks.dailyOpenClose('AAPL', '2023-12-01');
        setStockData(data);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        console.log(err.message);
      } finally {
        console.log(false);
      }
    }
    fetchStockData();
  }, []);

  // const r = rest.stocks
  //   .aggregates('AAPL', 1, 'day', '2024-01-01', '2024-02-01')
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((e) => {
  //     console.error('An error happened:', e);
  //   });
  return (
    <div>
      <h1>Stock Data for AAPL</h1>
      <pre>{JSON.stringify(stockData, null, 2)}</pre>
    </div>
  );
}

export default GetData;
// rest.stocks
//   .aggregates('AAPL', 1, 'day', '2023-01-01', '2023-04-14')
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.error('An error happened:', e);
//   });
