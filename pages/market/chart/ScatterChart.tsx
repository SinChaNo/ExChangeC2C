import { ApexOptions } from "apexcharts";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ScatterChart = () => {
  const series = [
    {
      name: "Points",
      type: "scatter",

      //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
      data: [
        {
          x: 1,
          y: 2.14,
        },
        {
          x: 1.2,
          y: 2.19,
        },
        {
          x: 1.8,
          y: 2.43,
        },
        {
          x: 2.3,
          y: 3.8,
        },
        {
          x: 2.6,
          y: 4.14,
        },
        {
          x: 2.9,
          y: 5.4,
        },
        {
          x: 3.2,
          y: 5.8,
        },
        {
          x: 3.8,
          y: 6.04,
        },
        {
          x: 4.55,
          y: 6.77,
        },
        {
          x: 4.9,
          y: 8.1,
        },
        {
          x: 5.1,
          y: 9.4,
        },
        {
          x: 7.1,
          y: 7.14,
        },
        {
          x: 9.18,
          y: 8.4,
        },
      ],
    },
    {
      name: "Line",
      type: "line",
      data: [
        {
          x: 1,
          y: 2,
        },
        {
          x: 2,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 4,
          y: 5,
        },
        {
          x: 5,
          y: 6,
        },
        {
          x: 6,
          y: 7,
        },
        {
          x: 7,
          y: 8,
        },
        {
          x: 8,
          y: 9,
        },
        {
          x: 9,
          y: 10,
        },
        {
          x: 10,
          y: 11,
        },
      ],
    },
  ];

  const options: ApexOptions = {
    title: {
      text: `USD 거래 추세 현황`,
    },
    chart: {
      height: 350,
      type: `line`,
    },
    fill: {
      type: `solid`,
    },
    markers: {
      size: [6, 0],
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: `numeric`,
      min: 0,
      max: 12,
      tickAmount: 12,
    },
  };

  const chartData = {
    series: series,
    options: options,
  };

  return (
    <div className="mixed-chart">
      {chartData && (
        <Chart
          options={chartData?.options}
          series={chartData?.series}
          type="line"
          height={350}
          // className="mixed-chart"
        ></Chart>
      )}
    </div>
  );
};

export default ScatterChart;
