import { useEffect, useState } from 'react';
import unixToTime from '../../utils/unixToTime';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend );

interface DataPoint {
  x: { index: number, value: string};
  y: number;
}


const TideChart = (props: any) => {
  const [tideData, setTideData] = useState<DataPoint[]>([]);
  const [options, setOptions] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {   // Create objects needed to build line chart.
    if (tideData.length > 0) {
      console.log(tideData)
      setOptions({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false, // Hide the x-axis
          },
          y: {
            min: -1,
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
            interaction: {
              intersect: false, // Activate tooltip based on closest x-axis value
            }, 
            mode: 'index',  
            external: function(context) {
              console.log(context)
              const dataIndex = context.tooltip.dataPoints[0]?.dataIndex; // Get the index of the hovered bar
            },
         },
        }
      })

      let labels = tideData.map(item => item.x.value)
      setData({
        labels,
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: tideData.map((item) => item.y),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      })
      setIsLoading(false)
  }}, [tideData] )

  useEffect(() => {     // Parse incoming tideData
    if (props.data && props.minTimestamp) {

      const timestampDictionary = {}; // to track encountered timestamps
      const filteredData = props.data.filter(item =>
          item.type === 'NORMAL' &&
          item.timestamp >= props.minTimestamp &&
          item.timestamp <= props.maxTimestamp &&
          !timestampDictionary[item.timestamp] // Exclude duplicates
        );
      const transformedData: DataPoint[] = [];
      let index = 0;

      filteredData.forEach(item => {
        const obj: DataPoint = {
          x: { index: index, value: unixToTime(item.timestamp) },
          y: item.height
        };
        if (timestampDictionary[item.timestamp] == undefined) {
          transformedData.push(obj);
          timestampDictionary[item.timestamp] = 1
          index++;
        }
       });
      setTideData(transformedData);
    }
  }, [props.data, props.minTimestamp, props.maxTimestamp]);

  return (
       <div>
        { !isLoading ? <Line options={options} data={data} /> : <p>loading</p>}
      </div>
  )
};

export default TideChart;
