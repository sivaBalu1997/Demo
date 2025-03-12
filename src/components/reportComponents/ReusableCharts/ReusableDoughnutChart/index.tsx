import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './style.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
  label: string;
  value: number;
  color: string;
  borderColor?: string;
}

interface ReusableDoughnutChartProps {
  data: ChartData[];
  totalAmount: string;
  totalItems: number;
  tooltipAmount: string;
}

const ReusableDoughnutChart: React.FC<ReusableDoughnutChartProps> = ({
  data,
  totalAmount,
  totalItems,
  tooltipAmount
}) => {
  const calculatePercentage = (value: number): number => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return Math.round((value / total) * 100);
  };

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [{
      data: data.map(item => item.value),
      backgroundColor: data.map(item => item.color),
      borderColor: data.map(item => item.borderColor || item.color),
      borderWidth: 1,
      spacing: 0,
    }]
  };

  const options: any = {
    responsive: true,
    cutout: '70%',
    radius: '90%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          color: '#666666',
          font: {
            size: 13,
            family: "'Arial', sans-serif"
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'white',
        titleColor: '#666666',
        bodyColor: '#666666',
        borderColor: '#2E7D32',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          title: (context: any) => '',
          beforeBody: (context: any) => {
            return [`Total item: ${totalItems}`, `Amount: ${tooltipAmount}`];
          },
          label: (context: any) => ''
        },
        position: 'nearest'
      }
    }
  };

  return (
    <div className="doughnut-chart-wrapper">
      <div className="doughnut-chart-container">
        {/* Center Text */}
        <div className="center-text">
          <span className="title">Total</span>
          <span className="amount">{totalAmount}</span>
        </div>

        {/* Chart */}
        <Doughnut data={chartData} options={options} />

        {/* Percentage Labels */}
        <div className="percentage-labels">
          {data.map((item, index) => {
            const percentage = calculatePercentage(item.value);
            const angle = (360 / data.length) * index - 90; // Start from top
            const radius = 130; // Adjust based on your chart size
            
            // Calculate position using trigonometry
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={index}
                className="label-box"
                style={{
                  '--x': `${x}px`,
                  '--y': `${y}px`,
                  '--color': item.color,
                  '--border-color': item.borderColor || item.color
                } as React.CSSProperties}
              >
                {percentage}%
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReusableDoughnutChart;