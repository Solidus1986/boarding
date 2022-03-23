import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'left' as const,
    },
    title: {
      display: true,
      text: 'My shares',
    },
    responsive: true,
  },
};

export const data = {
  labels: ['Microsoft', 'Apple', 'Amazon', 'Alphabet'],
  datasets: [
    {
      label: '# of Shares',
      data: [15, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

export default function PieChart() {
  return <Pie options={options} data={data} />;
}
