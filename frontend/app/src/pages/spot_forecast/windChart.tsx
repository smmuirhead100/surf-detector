import { useEffect, useState } from 'react';
import './style/tideChart.css'
import unixToTime from '../../utils/unixToTime';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface DataPoint {
  x: { index: number, value: string };
  y: any;
}

const WindChart = (props: any) => {
  const [windData, setWindData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currIndex, setCurrIndex] = useState(0)

  useEffect(() => {
    if (props.data && props.minTimestamp && props.maxTimestamp) {
      const timestampDictionary = {};
      const filteredData = props.data.filter(item =>
        item.timestamp >= props.minTimestamp &&
        item.timestamp <= props.maxTimestamp &&
        !timestampDictionary[item.timestamp]
      );
      
      const transformedData: DataPoint[] = [];
      let index = 0;

      filteredData.forEach(item => {
        const obj: DataPoint = {
          x: { index: index, value: unixToTime(item.timestamp) },
          y: { directionRelation: item.directiontype, speed: Math.round(item.speed * 100) / 100, direction: item.direction }
        };
        if (timestampDictionary[item.timestamp] === undefined) {
          transformedData.push(obj);
          timestampDictionary[item.timestamp] = 1;
          index++;
        }
      });

      setWindData(transformedData);
      setIsLoading(false);
    }
  }, [props.data, props.minTimestamp, props.maxTimestamp]);

    const options: ChartOptions<any> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false, // Hide the x-axis
          },
          y: {
            min: 0,
            grid: {
              display: true
            },
            ticks: {
              display: true
            },
            title: {
              display: true, // Hide the y-axis title
            },
            border: {
              display: false
            }
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: false,
            interaction: {
              intersect: false, // Activate tooltip based on closest x-axis value
            }, 
            mode: 'index',  
            external: function(context) {
              setCurrIndex(context.tooltip.dataPoints[0]?.dataIndex) // Get the index of the hovered bar
              props.changeWind(windData[currIndex].y)
              props.changeTime(windData[currIndex].x.value)
            },
         },
        }
      }

      const data = {
        labels: windData.map(item => item.x.value),
        datasets: [
          {
            fill: true,
            data: windData.map((item) => item.y.speed),
            borderColor: 'rgba(75, 147, 255, 0.49)',
            backgroundColor: (context) => {
              const dataIndex = context.dataIndex;
              return dataIndex === currIndex ? '#257CFF' : 'rgba(75, 147, 255, 0.49)';
            },
            pointRadius: (context) => {
              const dataIndex = context.dataIndex;
              return dataIndex === currIndex ? 6 : 3; // Larger radius for highlighted point
            },
          },
        ],
      }
      return (
        <div className='-translate-x-5'>
          {isLoading ? <p>Loading...</p> : <Line options={options} data={data} />}
        </div>
      );
    };

export default WindChart;
