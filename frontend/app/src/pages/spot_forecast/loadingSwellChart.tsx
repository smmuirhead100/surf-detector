import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip
);

export default function LoadingSwellChart() {
    console.log('loading temp swelll chart')
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const heights = [1, 1, 2, 3, 4, 5, 4, 3, 2, 4, 4, 4, 5, 3, 2, 1, 1, 2, 3, 4]

    const data: ChartData<any>= {
      labels, 
      datasets: [
        {
          data: heights,
          backgroundColor: 'grey'
        }
      ]
    }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        min: 0,
        max: 5,
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          display: false
        },
        title: {
          display: false, // Hide the y-axis title
        },
        border: {
          display: false
        }
      },
    },
    elements: {
      bar: {
        borderRadius: 20, // Rounded edges for the bars
        borderSkipped: false,
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false,
        },
    }
  }

    return (
        <Bar options={options} data={data} />
    )
  }
