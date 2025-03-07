import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: "Check-in",
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [30, 45, 35, 40, 50, 40, 60],
    },
    {
      type: 'bar' as const,
      label: "Guest",
      backgroundColor: 'rgb(75, 192, 192)',
      data: [190, 150, 120, 130, 110, 170, 190],
      borderColor: 'white',
      borderWidth: 2,
    },
    // {
    //   type: 'bar' as const,
    //   label: 'Dataset 3',
    //   backgroundColor: 'rgb(53, 162, 235)',
    //   data: labels.map((a, index) =>index*100),
    // },
  ],
};

export function DailyCheckinsChart() {
  return <Chart type='bar' data={data} />;
}

export default DailyCheckinsChart