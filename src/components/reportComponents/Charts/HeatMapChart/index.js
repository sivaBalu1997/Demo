import React from 'react'
import Chart from 'react-apexcharts';


const HeatMapChart = ({ data, options, series }) => {
      return (
        <div className="heatmap-chart">
          <Chart options={options} series={series} type="heatmap" height="350" />
        </div>
      );
    };
    

export default HeatMapChart
