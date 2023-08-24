import unixToTime from '../../utils/unixToTime';
import { useEffect, useState } from 'react';

const ratingDict = {
  'EPIC': <span style={{color: '#4100CA'}}>Firing</span>,
  'GOOD': <span style={{color: '#166D00'}}>Super Fun</span>,
  'FAIR_TO_GOOD': <span style={{color: '#166D00'}}>Super Fun</span>,
  'FAIR': <span style={{color: '#23AE00'}}>Fun</span>,
  'POOR_TO_FAIR': <span style={{color: '#E7A600'}}>Not Bad</span>,
  'POOR': <span style={{color: '#FF5454'}}>Bad</span>
}

const ratingBackgroundDict = {0: '#FF5454', 1: '#FF5454', 2:'#E7A600', 3: '#23AE00', 4: '#166D00', 5: '#4100CA', 6: '#4100CA'}

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

export default function SwellChart(props: any) {
  if (props.data && props.minTimestamp && props.ratingData) {
    const minTimestamp = props.minTimestamp 
    const maxTimestamp = props.maxTimestamp 
    const [dataIndex, setDataIndex] = useState(0)
    const filteredData = props.data.filter(
        (item) => item.timestamp >= minTimestamp && item.timestamp <= maxTimestamp
    );

    const filteredRatingData = props.ratingData.filter(
      (item) => item.timestamp >= minTimestamp && item.timestamp <= maxTimestamp
    );
    const labels = filteredData.map((data) => unixToTime(data.timestamp))
    const heights = filteredData.map((data) => {
      const averageHeight = (data.surf.rawSurf.rawMax + data.surf.rawSurf.rawMin) / 2;
      return Number(averageHeight.toFixed(2)); // Round to 2 decimal places
    });
    useEffect(() => {
          const hoveredValue = '-'; // Get the value of the hovered bar
          const hoveredRating = '-'
          props.changeHeight(hoveredValue)
          props.changeRating(hoveredRating)
    }, [props.spot])

    const data: ChartData<any>= {
      labels, 
      datasets: [
        {
          data: heights,
          backgroundColor: filteredRatingData.map(item => {
            return ratingBackgroundDict[item.rating.value]
          }),
          borderColor: (context) => {
            const index = context.dataIndex;
            return index === dataIndex ? 'black' : 'transparent';
          },
          borderWidth: (context) => {
            const index = context.dataIndex;
            return index === dataIndex ? '4' : '0';
          },
          
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
        max: props.maxHeight,
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
        borderRadius:20, // Rounded edges for the bars
        borderSkipped: false,
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false,
        external: function(context) {
          setDataIndex(context.tooltip.dataPoints[0]?.dataIndex) // Get the index of the hovered bar
          if (dataIndex !== undefined) {
            const hoveredValue = heights[dataIndex]; // Get the value of the hovered bar
            const hoveredRating = ratingDict[filteredRatingData[dataIndex].rating.description]
            props.changeHeight(hoveredValue)
            props.changeRating(hoveredRating)
            props.changetime(context.tooltip.title)
            }
        },
    }
  }
}
    return (
        <Bar options={options} data={data} />
    )
  }
}