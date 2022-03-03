import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function ChartColumn({ NameChart, labels, datas }) {
  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: NameChart,
            position: "bottom",
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: "Đang quản lý",
            data: datas ? datas.map((item) => item[0]) : [],
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "Đã rời khỏi",
            data: datas ? datas.map((item) => item[1]) : [],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }}
    />
  );
}

export default ChartColumn;
