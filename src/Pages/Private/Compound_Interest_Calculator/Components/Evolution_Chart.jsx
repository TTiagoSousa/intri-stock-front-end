import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import * as Color from '../../../../Styles/Colors'; 
import { useTheme } from '../../../../Contexts/Theme_Context';

const Evolution_Chart = ({ monthlyBreakdown }) => {

  const { mode } = useTheme();

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const textColor = mode === 'dark' ? Color.gray : Color.black;

  useEffect(() => {
    if (!monthlyBreakdown || !chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;

    const months = monthlyBreakdown.map((entry) => `Mês ${entry.month}`);
    const totalInvested = monthlyBreakdown.map((entry) => entry.totalInvested);
    const totalAccumulated = monthlyBreakdown.map((entry) => entry.totalAccumulated);

    const option = {
      textStyle: {
        fontFamily: 'Roboto, sans-serif',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Total Investido', 'Total Acumulado'],
        textStyle: {
          color: textColor,
          fontFamily: 'Roboto, sans-serif',
        },
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months,
        axisLine: {
          lineStyle: {
            color: textColor,
          },
        },
        axisLabel: {
          color: textColor,
          fontFamily: 'Roboto, sans-serif', // 👈 Nos labels do eixo X
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: textColor,
          },
        },
        axisLabel: {
          color: textColor,
          fontFamily: 'Roboto, sans-serif', // 👈 Nos labels do eixo Y
        },
        splitLine: {
          lineStyle: {
            color: mode === 'dark' ? '#444' : '#eee',
          },
        },
      },
      series: [
        {
          name: 'Total Investido',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' },
          data: totalInvested,
        },
        {
          name: 'Total Acumulado',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' },
          data: totalAccumulated,
        },
      ],
    };
  

    chartInstance.setOption(option);

    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, [monthlyBreakdown]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

Evolution_Chart.propTypes = {
  monthlyBreakdown: PropTypes.array.isRequired,
};

export default Evolution_Chart;
