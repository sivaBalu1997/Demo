import React, {useEffect, useRef} from 'react'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend,CategoryScale } from 'chart.js';


const LineChartTwo = ({ labels, datasets, options }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
  
      const ctx = chartRef.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
        options: {
            ...options,
            plugins: {
              legend: {
                labels: {
                  color: '#fff', // Change legend label color here
                },
              },
            },
          },
      });
  
      return () => {
        chartInstance.destroy(); // Cleanup on unmount
      };
    }, [labels, datasets, options]);
  
    return <canvas ref={chartRef}></canvas>;
  };
  

export default LineChartTwo
