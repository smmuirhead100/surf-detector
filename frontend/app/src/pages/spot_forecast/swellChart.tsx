import './style/swellChart.css'
import * as d3 from "d3";
import {useRef, useEffect} from "react";
import unixToTime from '../../utils/unixToTime'

export default function swellChart(props: any) {
  const waveData = props.data; // Data to be used for chart. 
  const chartRef = useRef(null);


  useEffect(() => {
    if (waveData) {
      // Define the data
      const data = [];
      for (let i = 0; i < waveData.length; i = i + 1) {
        let obj = {
          time: unixToTime(waveData[i]['timestamp']),
          height: (waveData[i]['surf']['rawSurf']['rawMin'] + waveData[i]['surf']['rawSurf']['rawMax']) / 2,
        }
        data.push(obj);
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
        .domain([0, d3.max(data, (d) => d.height)]);
  
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
        .attr('x', (d) => x(d.time))
        .attr('width', x.bandwidth())
        .attr('y', height) // Set initial y position of bars to the bottom of the chart
        .attr('height', 0) // Set initial height of bars to 0
        .attr('fill', '#257CFF') // Set a fixed fill color
  
      // Define a function for the wave transition
      const waveTransition = (bar) => {
        bar.transition()
          .duration(1000)
          .delay((_, i) => i * 2)
          .attr('y', (d) => y(d.height))
          .attr('height', (d) => height - y(d.height));
      };
  
      // Call the waveTransition function to animate the bars
      waveTransition(bars);
  
      // Add the x-axis
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x)
          .ticks(Math.floor(data.length / 5))
          .tickSize(0)
          .tickPadding(10)
          .tickFormat((_, i) => (i % 5 === 0) ? data[i].time : '')
        );
  
      // Add the y-axis
      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));
    }
  }, [waveData]);
  
  if (!waveData) {
    return <p>loading</p>
  }
  
  return (
    <div>
          <div className='swellChart'>
              <div ref={chartRef}></div>
          </div>
    </div>
  );
}