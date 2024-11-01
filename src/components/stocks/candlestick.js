import Plot from 'react-plotly.js';
import React from 'react';

export default function CandleStick() {
  //   function unpack(rows, key) {
  //     return rows.map(function (row) {
  //       return row[key];
  //     });
  //   }

  return (
    <div
      className=""
      style={{
        display: 'flex',
        justifyContent: 'top',
        alignItems: 'top',
        height: '100vh',
        marginTop: '10px',
      }}
    >
      <Plot
        data={[
          {
            x: [
              '2023-10-20',
              '2023-10-21',
              '2023-10-22',
              '2023-10-23',
              '2023-10-24',
              '2023-10-25',
              '2023-10-26',
            ],
            open: [1, 2, 3, 4, 5, 6, 2],
            high: [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 2.5],
            low: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 1.5],
            close: [1.2, 2.3, 3.1, 4.4, 5.0, 6.2, 1.9],
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            increasing: { line: { color: 'black' } },
            decreasing: { line: { color: 'red' } },
          },
          {
            x: [
              '2023-10-20',
              '2023-10-21',
              '2023-10-22',
              '2023-10-23',
              '2023-10-24',
              '2023-10-25',
              '2023-10-26',
            ],
            y: [1000000, 1500000, 1200000, 1700000, 1600000, 4000000, 6900222],
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
          height: 650, // Adjust height if needed
        }}
        config={{ displaylogo: false }}
      />
    </div>
  );
}

// export default CandleStick;
