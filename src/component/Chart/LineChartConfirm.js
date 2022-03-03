import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({labels, datas, label1, title}){
    return (
        <Line
            options = {{
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                plugins: {
                    title: {
                    display: true,
                    text: title,
                    },
                },
                scales: {
                    y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    },
                    y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                    },
                },
            }}  
            data = {{
                labels,
                datasets: [
                  {
                    label: label1,
                    data: datas ? datas.map((item) => item[0]) : [],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1',
                  },
                ],
            }}

        />
    )
}

export default LineChart;