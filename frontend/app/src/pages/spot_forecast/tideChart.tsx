import { useEffect, useState } from 'react';
import './style/tideChart.css'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface DataPoint {
  x: { index: number, value: string };
  y: number;
}

const TideChart = (props: any) => {
  const [tideData, setTideData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currIndex, setCurrIndex] = useState(0)

  useEffect(() => {
    if (props.data && props.minTimestamp && props.maxTimestamp) {
      const transformedData: DataPoint[] = [];
      const minTimestamp = props.minTimestamp;
      const maxTimestamp = props.maxTimestamp;
      
      let currData = props.data.predictions;
      let index = 0;
  
      currData.forEach(item => {
        const unixTimestamp = new Date(item.t).getTime() / 1000; // Convert string to Unix timestamp
        if (unixTimestamp >= minTimestamp && unixTimestamp <= maxTimestamp) {
          const obj: DataPoint = {
            x: { index: index, value: item.t },
            y: item.v
          };
          transformedData.push(obj);
        }
        index++;
      });

      setTideData(transformedData);
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
            min: -1.5,
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
                if(!isNaN(tideData[currIndex].y)) {
                  props.changeTide(tideData[currIndex].y)
                }
              props.changeTime(tideData[currIndex].x.value)
            },
         },
        }
      }

      const data = {
        labels: tideData.map(item => item.x.value),
        datasets: [
          {
            fill: true,
            data: tideData.map((item) => item.y),
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
        <div className='border-solid border-2 m-0 p-0'>
          {isLoading ? <p>Loading...</p> : <Line options={options} data={data} />}
        </div>
      );
    };

export default TideChart;
