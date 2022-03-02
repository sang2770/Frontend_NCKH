import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartPie({ NameChart, labels, datas }) {
  return (
    <Pie
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
            label: "# of Votes",
            data: datas,
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

export default ChartPie;
