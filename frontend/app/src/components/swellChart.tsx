import './style/swellChart.css'
import * as d3 from "d3";
import {useRef, useEffect, useState} from "react";
import loading from '../assets/loading.gif'
import unixToTime from '../utils/unixToTime'

export default function swellChart(props: any) {
  const [waveData, setWaveData] = useState([]); // Data to be used for chart. 
  const [isWaveLoading, setIsWaveLoading] = useState(true); // Loading state
  const [isRatingLoading, setIsRatingLoading] = useState(true);
  const [ratingData, setRatingData] = useState([]) // Rating data to be used for chart
  const chartRef = useRef(null);

  interface Data {
    time: any, 
    height: any,
    rating: any
  }

  useEffect(() => {
    // Fetch wave data from API
    console.log('getting wave data')
    fetch(`https://goldfish-app-qsewy.ondigitalocean.app/wave?spot=${props.spot}`)
      .then(response => response.json())
      .then(data => {
        setWaveData(data);
        setIsWaveLoading(false); // Set loading state to false
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    // Fetch rating data from API
    if (!isWaveLoading && waveData.length > 0) {
      console.log('Getting rating data')
      fetch(`https://goldfish-app-qsewy.ondigitalocean.app/rating?spot=${props.spot}`)
        .then(response => response.json())
        .then(data => {
          setRatingData(data)
          setIsRatingLoading(false)
          props.handleLoading()
        })
        .catch(error => console.log(error))
      }
  }, [isWaveLoading, waveData])

  useEffect(() => {
    if (!isRatingLoading && ratingData.length > 0) { // Only render chart if data is loaded
      // Define the data
      const data = [];
      for (let i = 0; i < waveData.length; i = i + 6) {
          let obj = {
              time: unixToTime(waveData[i]['timestamp']),
              height: (waveData[i]['surf']['rawSurf']['rawMin'] + waveData[i]['surf']['rawSurf']['rawMax']) / 2,
              rating: (ratingData[i]['rating']['value'])
          }
          data.push(obj)
      }

      // Define the dimensions of the chart
      const margin = { top: 20, right: 50, bottom: 30, left: 0 };
      const width = 6000 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      // Define the scales
      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map(d => d.time));

      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d: { height: any; }) => d.height)]);

      // Define the chart
      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left + 50},${margin.top})`);

      // Add the bars
      const bars = svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d: Data) => x(d.time))
        .attr('width', x.bandwidth())
        .attr('y', height) // Set initial y position of bars to the bottom of the chart
        .attr('height', 0) // Set initial height of bars to 0
        .attr('fill', (d: { rating: number }) => {
          // Set the fill color based on the rating value
          if (d.rating >= 0 && d.rating < 2) {
            return '#FF8585';
          } else if (d.rating >= 2 && d.rating < 4) {
            return '#FFDC61';
          } else if (d.rating >= 4) {
            return '#71FF76';
          }
          return '#257CFF'; // Default fill color if rating is not within any range
        });

    // Define a function for the wave transition
    const waveTransition = (bar:any) => {
        bar.transition()
        .duration(1000) // Set the duration of each transition to 1 second
        .delay((d: any, i: number) => i * 50) // Add a delay to each bar based on its index
        .attr('y', (d: { height: any; }) => y(d.height)) // Set the y attribute to the height of the bar
        .attr('height', (d: { height: any; }) => height - y(d.height)) // Set the height of the bar
     };

  // Call the waveTransition function to animate the bars
  waveTransition(bars);

      // Add the x-axis
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add the y-axis
      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));
    }
  }, [isRatingLoading, ratingData]);

  return (
    <div>
      {isRatingLoading ? 
          <div className='loadingChartWrapper'>
            <div className='loadingChart'>
                <img src={loading}/>
                <h2>Loading</h2>
            </div> 
          </div>
          : 
          <div className='swellChart'>
              <div ref={chartRef}></div>
          </div>}
    </div>
  );
}