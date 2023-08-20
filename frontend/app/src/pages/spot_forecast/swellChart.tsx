import './style/swellChart.css'
import * as d3 from "d3";
import {useRef, useEffect} from "react";
import unixToTime from '../../utils/unixToTime'

interface ChartData {
  time: string; // Adjust the data type according to the actual type
  height: number; // Adjust the data type according to the actual type
  timestamp: number;
  surf: any
}

export default function SwellChart(props: any) {
  const waveData = props.data as ChartData[]; // Data to be used for chart.
  const chartRef = useRef(null);


  useEffect(() => {
    d3.select(chartRef.current).selectAll('svg').remove();
    if (waveData && props.minTimestamp) {
        const minTimestamp = props.minTimestamp 
        const maxTimestamp = props.maxTimestamp 
        const filteredData = waveData.filter(
            (item) => item.timestamp >= minTimestamp && item.timestamp <= maxTimestamp
        );

        const data = filteredData.map((item) => ({
            time: unixToTime(item.timestamp),
            height: (item.surf.rawSurf.rawMin + item.surf.rawSurf.rawMax) / 2,
        }));
  
      // Define the dimensions of the chart
      const margin = { top: 20, right: 50, bottom: 30, left: 0 };
      const width = 1000 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
  
      // Define the scales
      const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map((d) => String(d.time))); // Convert time to string

      const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, 10]);
    
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
          .ticks(Math.floor(data.length / 3))
          .tickSize(0)
          .tickPadding(10)
          .tickFormat((_, i) => (i % 5 === 0) ? data[i].time : '')
        );
  
      // Add the y-axis
      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));
    }
  }, [waveData, props.minTimestamp, props.maxTimestamp]);
  
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