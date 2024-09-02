// BarChart.tsx
import React, { useContext, useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.scss"; // Import your SCSS for styling
import { ThemeContext } from "../../../../helpers/context/ThemeContext";

interface BarchartProps {
  xAxisData: string[]; // Assuming xAxisData is an array of strings (labels)
  yAxisData: number[]; // Assuming yAxisData is an array of numbers (values)
  label?: string;
  backgroundColor?: string | string[]; // Allow for single color or an array of colors
  borderColor?: string | string[]; // Allow for single color or an array of colors
  xAxisGridColor?: string;
  yAxisGridColor?: string;
  xAxisTicksColor?: string;
  yAxisTicksColor?: string;
  pluginLegendLabelsColor?: string;
  ttTitleColor?: string;
  ttBodyColor?: string;
  yAxisLabel?: string;
  yAxislabelColor?: string;
  xAxisLabel?: string;
  xAxislabelColor?: string;
  BatChartTitle?: string;
  TitleColor?: string;
}

const BarChart: React.FC<BarchartProps> = ({
  xAxisData,
  yAxisData,
  label = "Data",
  backgroundColor = "rgba(75, 192, 192, 0.2)", // Default background color
  borderColor = "rgba(75, 192, 192, 1)", // Default border color
  xAxisGridColor = "#283347",
  yAxisGridColor = "#283347",
  xAxisTicksColor = "#fff",
  yAxisTicksColor = "#fff",
  pluginLegendLabelsColor = "#fff",
  ttTitleColor = "#fff",
  ttBodyColor = "#fff",
  yAxisLabel,
  yAxislabelColor = "",
  xAxisLabel,
  xAxislabelColor = "",
  BatChartTitle = "",
  TitleColor = "",
}: BarchartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null); // Ref to hold the canvas element
  const isDarkTheme = useContext(ThemeContext);
  console.log("vanakkam", { isDarkTheme });

  useEffect(() => {
    // Register necessary components from Chart.js
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );

    const ctx = chartRef.current?.getContext("2d"); // Get the context for the canvas
    if (ctx) {
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: xAxisData,
          datasets: [
            {
              label,
              data: yAxisData,
              backgroundColor: Array.isArray(backgroundColor)
                ? backgroundColor
                : [backgroundColor], // Ensure backgroundColor is an array
              borderColor: Array.isArray(borderColor)
                ? borderColor
                : [borderColor], // Ensure borderColor is an array
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: yAxisGridColor,
              },
              ticks: {
                color: yAxisTicksColor,
              },
              title: {
                display: !!yAxisLabel, // Display title only if yAxisLabel is provided
                text: yAxisLabel,
                color: yAxislabelColor, // Adjust as needed
                font: {
                  size: 14, // Adjust as needed
                },
              },
            },
            x: {
              grid: {
                color: xAxisGridColor,
              },
              ticks: {
                color: xAxisTicksColor,
              },
              title: {
                display: !!xAxisLabel, // Display title only if xAxisLabel is provided
                text: xAxisLabel,
                color: xAxislabelColor, // Adjust as needed
                font: {
                  size: 14, // Adjust as needed
                },
              },
            },
          },
          plugins: {
            title: {
              display: !!BatChartTitle, // Display title only if BatChartTitle is provided
              text: BatChartTitle,
              color: TitleColor,
              font: {
                size: 25,
                weight: "bold",
              },
            },
            legend: {
              labels: {
                color: pluginLegendLabelsColor,
              },
            },
            tooltip: {
              titleColor: ttTitleColor,
              bodyColor: ttBodyColor,
            },
          },
        },
      });

      console.log("inside effect", { isDarkTheme });

      return () => {
        chartInstance.destroy(); // Cleanup on unmount
      };
    }
  }, [
    xAxisData,
    yAxisData,
    label,
    backgroundColor,
    borderColor,
    xAxisGridColor,
    yAxisGridColor,
    xAxisTicksColor,
    yAxisTicksColor,
    pluginLegendLabelsColor,
    ttTitleColor,
    ttBodyColor,
    yAxisLabel,
    xAxisLabel,
    BatChartTitle,
    isDarkTheme,
    TitleColor,
  ]);

  return (
    <div
      className={`c-bar-chart-container ${
        isDarkTheme ? "chart-dark-js" : "chart-light-js"
      }`}
    >
      <canvas
        // className={`${isDarkTheme ? "cdark-theme" : "clight-theme"}`}
        ref={chartRef}
      ></canvas>
    </div>
  );
};

export default BarChart;

//========================================================================================

// import React, { useContext } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { ThemeContext } from "../../../../helpers/context/ThemeContext";
// import "./style.scss"; // Import your SCSS for styling

// // Register the required components with Chart.js
// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// );

// interface BarchartProps {
//   xAxisData: string[]; // Assuming xAxisData is an array of strings (labels)
//   yAxisData: number[]; // Assuming yAxisData is an array of numbers (values)
//   label?: string;
//   backgroundColor?: string | string[]; // Allow for single color or an array of colors
//   borderColor?: string | string[]; // Allow for single color or an array of colors
//   xAxisGridColor?: string;
//   yAxisGridColor?: string;
//   xAxisTicksColor?: string;
//   yAxisTicksColor?: string;
//   pluginLegendLabelsColor?: string;
//   ttTitleColor?: string;
//   ttBodyColor?: string;
//   yAxisLabel?: string;
//   xAxisLabel?: string;
//   BatChartTitle?: string;
// }

// const BarChart: React.FC<BarchartProps> = ({
//   xAxisData,
//   yAxisData,
//   label = "Data",
//   backgroundColor = "rgba(75, 192, 192, 0.2)", // Default background color
//   borderColor = "rgba(75, 192, 192, 1)", // Default border color
//   xAxisGridColor = "#283347",
//   yAxisGridColor = "#283347",
//   xAxisTicksColor = "#fff",
//   yAxisTicksColor = "#fff",
//   pluginLegendLabelsColor = "#fff",
//   ttTitleColor = "#fff",
//   ttBodyColor = "#fff",
//   yAxisLabel,
//   xAxisLabel,
//   BatChartTitle = "",
// }) => {
//   const isDarkTheme = useContext(ThemeContext) ?? { isDarkTheme: false };

//   const data = {
//     labels: xAxisData,
//     datasets: [
//       {
//         label,
//         data: yAxisData,
//         backgroundColor: Array.isArray(backgroundColor)
//           ? backgroundColor
//           : [backgroundColor], // Ensure backgroundColor is an array
//         borderColor: Array.isArray(borderColor) ? borderColor : [borderColor], // Ensure borderColor is an array
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: yAxisGridColor,
//         },
//         ticks: {
//           color: yAxisTicksColor,
//         },
//         title: {
//           display: !!yAxisLabel,
//           text: yAxisLabel,
//           color: isDarkTheme ? "#fff" : "#000",
//           font: {
//             size: 14,
//           },
//         },
//       },
//       x: {
//         grid: {
//           color: xAxisGridColor,
//         },
//         ticks: {
//           color: xAxisTicksColor,
//         },
//         title: {
//           display: !!xAxisLabel,
//           text: xAxisLabel,
//           color: isDarkTheme ? "#fff" : "#000",
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
// plugins: {
//   title: {
//     display: !!BatChartTitle,
//     text: BatChartTitle,
//     color: isDarkTheme ? "#fff" : "#000",
//     font: {
//       size: 25,
//       weight: "bold", // Use one of the acceptable values here
//     },
//   },
//   legend: {
//     labels: {
//       color: pluginLegendLabelsColor,
//     },
//   },
//   tooltip: {
//     titleColor: ttTitleColor,
//     bodyColor: ttBodyColor,
//   },
// },
// };

//   const plugins = {
//     title: {
//       display: !!BatChartTitle,
//       text: BatChartTitle,
//       color: isDarkTheme ? "#fff" : "#000",
//       font: {
//         size: 25,
//         weight: "bold", // Use one of the acceptable values here
//       },
//     },
//     legend: {
//       labels: {
//         color: pluginLegendLabelsColor,
//       },
//     },
//     tooltip: {
//       titleColor: ttTitleColor,
//       bodyColor: ttBodyColor,
//     },
//   };
//   return (
//     <div
//       className={`c-bar-chart-container ${
//         isDarkTheme ? "chart-dark-js" : "chart-light-js"
//       }`}
//     >
//       <Bar data={data} options={options} plugins={plugins as any} />
//     </div>
//   );
// };

// export default BarChart;
