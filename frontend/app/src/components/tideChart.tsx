import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import unixToTime from '../utils/unixToTime';

const TideChart = (props: any) => {
  const chartRef = useRef(null);
  const [currentYValue, setCurrentYValue] = useState('');
  const [tideData, setTideData] = useState([]); // Data to be used for chart.
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch wave data from API
    console.log('getting wave data')
    fetch(`https://goldfish-app-qsewy.ondigitalocean.app/tide?spot=${props.spot}`)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i = i + 6) {
            let obj = {
                x: {index: i, value: unixToTime(data[i]['timestamp'])},
                y: data[i]['height']
            }
            setTideData(prevState => [...prevState, obj])
        }
        console.log(tideData)
        setIsLoading(false); // Set loading state to false
      })
      .catch(error => console.log(error))
  }, [props.spot]);
  
  useEffect(() => {
    if (!isLoading && tideData.length > 0) {
        let data = tideData
        let height = 300;
        let width = 6000;
        
        // Set up the chart dimensions and margins
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

        // Create the main group for the chart
        const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

        // Set up the x and y scales
        const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x.index))
        .range([0, innerWidth]);

        const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
        .range([innerHeight, 0]);

        // Create the line generator
        const line = d3.line()
        .x(d => x(d.x.index))
        .y(d => y(d.y))
        .curve(d3.curveMonotoneX);

        // Add the line to the chart
        g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
            .attr('stroke', 'steelblue')

        // Add circles for each data point
        const circles = g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.x.index))
        .attr('cy', d => y(d.y))
        .attr('r', 0)
        .attr('fill', 'steelblue');

        // Add event handlers to highlight nearest point on hover
        svg.on('mousemove', function (event) {
            const [mouseX] = d3.pointer(event);
            const bisect = d3.bisector(d => d.x.index).left;
            const x0 = x.invert(mouseX);
            const index = bisect(data, x0, 1);
        
            let nearestDataPoint;
            if (index === 0) {
            nearestDataPoint = data[index];
            } else {
            const d0 = data[index - 1];
            const d1 = data[index];
            nearestDataPoint =
                x0 - d0.x > d1.x - x0 ? d1 : d0;
            }
        
            circles.attr('r', d => (d === nearestDataPoint ? 5 : 0));

            // Display y-value of nearest data point
            setCurrentYValue(nearestDataPoint.y);
        }).on('mouseout', function () {

        // Clear y-value display on mouseout
        setCurrentYValue('');
        });

        // Add the x-axis
        g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x).tickFormat(d => data[d]?.x.value || 'error'));

        // Add the y-axis
        g.append('g')
        .call(d3.axisLeft(y));
    }

}, [isLoading, tideData]);

  return (
    <div>
        <div ref={chartRef} className="chart"></div>
        <h2>{currentYValue}</h2>
    </div>
  );
};

export default TideChart;
