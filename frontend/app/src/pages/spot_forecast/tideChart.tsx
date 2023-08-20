import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import unixToTime from '../../utils/unixToTime';

interface DataPoint {
  x: { index: number, value: string};
  y: number;
}

interface ArbitraryDataPoint {
  x: number;
  y: number;
}


const TideChart = (props: any) => {
  const chartRef = useRef(null);
  const [tideData, setTideData] = useState<DataPoint[]>([]);

  function renderArbitraryChart(){
    const arbitraryData = [
      {x: 0, y: 1},
      {x: 1, y: 2}, 
      {x:2, y:4.9}, 
      {x: 3, y:2},
      {x: 4, y: .1},
      {x: 5, y: 3}
    ]
    // Chart Dimensions
    const width = 400
    const height = 200

    const x = d3.scaleLinear<number>() // Add the type parameter here
      .domain([-.2, 5.4])
      .range([0, width]);

    const y = d3.scaleLinear<number>() // Add the type parameter here
      .domain([-.2, 5.4])
      .range([height, 0]);

      const line = d3.line<ArbitraryDataPoint>() // Add the type parameter here
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);


    // Create SVG
    const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Add Line Path
    svg.append("path")
      .datum(arbitraryData)
      .attr("class", "line")
      .attr("d", line) // Call the line function with the data
      .attr("fill", "none")
      .attr("stroke", "#D1D1D1")
      .attr("stroke-width", 5);

    // Add Circles
    svg.selectAll(".circle")
        .data(arbitraryData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 6) // Adjust the radius as needed
        .attr("fill", "#D1D1D1");

    svg.append("g")
  }

  useEffect(() => {
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

  useEffect(() => {
    d3.select(chartRef.current).selectAll('svg').remove();
    if (tideData.length > 0) {
      const height = 200;
      const width = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain(d3.extent(tideData, d => d.x.index))
        .range([0, innerWidth]);

      const y = d3.scaleLinear()
        .domain([d3.min(tideData, d => d.y), d3.max(tideData, d => d.y)])
        .range([innerHeight, 0]);

      const line = d3.line<DataPoint>()
        .x(d => x(d.x.index))
        .y(d => y(d.y))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(tideData)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(65, 0, 202, 0.60)')
        .attr('stroke-width', 3);

      const circles = g.selectAll('circle')
        .data(tideData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.x.index))
        .attr('cy', d => y(d.y))
        .attr('r', 0)
        .attr('fill', '#257CFF');

      svg.on('mousemove', function (event) {
        const [mouseX] = d3.pointer(event);
        const bisect = d3.bisector((d: DataPoint) => d.x.index).left;
        const x0 = x.invert(mouseX);
        const index = bisect(tideData, x0, 1);

        let nearestDataPoint;
        if (index === 0) {
          nearestDataPoint = tideData[index];
        } else {
          const d0 = tideData[index];
          const d1 = tideData[index - 3];
          nearestDataPoint = x0 - d0.x.index > d1.x.index - x0 ? d1 : d0;
        }

        circles.attr('r', d => (d === nearestDataPoint ? 5 : 0));

        props.handleTide(nearestDataPoint.y, nearestDataPoint.x.value);
      }).on('mouseout', function () {
        circles.attr('r', 0);
      });

      const xAxisLabel = d3.axisBottom(x)
        .ticks(tideData.length / 4)
        .tickFormat(d => tideData[d.valueOf()].x.value || 'error');

      g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxisLabel)
        .selectAll('.tick text')

      g.append('g')
        .call(d3.axisLeft(y))
        .selectAll('.tick text')
    } else {
      renderArbitraryChart()
    }
  }, [tideData]);

  return (
    <div>
        <div className='swellChart'>
          <div ref={chartRef}></div>
        </div>
    </div>
  );
};

export default TideChart;
