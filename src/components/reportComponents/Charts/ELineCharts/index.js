import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import "./style.scss";

const EChartsComponent = ({ option }) => {
    useEffect(() => {
      const chartDom = document.getElementById('main');
      const myChart = echarts.init(chartDom);
    
      myChart.setOption(option);
    }, [option]);
  
    return <div id="main" style={{ width: '100%', height: '30rem' }} />;
  };

export default EChartsComponent;