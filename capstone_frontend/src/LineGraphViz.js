import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class LineGraphViz extends Component {

  componentDidMount() {
    this.drawChart(this.props.elemid);
  }

	drawChart(elemid) {
		var chart_bounds = d3
		  .select("#"+elemid)
		  .node()
		  .getBoundingClientRect();

		var dimension = chart_bounds.width;

		// set the dimensions and margins of the graph
		var margin = {top: 20, right: 20, bottom: 30, left: 50},
		    width = dimension - margin.left - margin.right,
		    height = dimension/3 - margin.top - margin.bottom ; // was just dimension

		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select("#"+elemid).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform",
		          "translate(" + margin.left + "," + margin.top + ")");

		// line has no visible axes!!

		// parse the date / time
		var parseTime = d3.timeParse("%Y");

		// set the ranges
		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);

		// define the line
		var valueline_solid = d3.line()
		    .x(function(d) { return x(d.Date); })
		    .y(function(d) { return y(d.Imports); });
		// define the line
		var valueline_dashed = d3.line()
		    .x(function(d) { return x(d.Date); })
		    .y(function(d) { return y(d.Exports); });
		 

		function draw(data, id) {
		  
			var data = data[id];

			// format the data
			data.forEach(function(d) {
			  d.Date = parseTime(d.Date);
			  d.Imports = +d.Imports;
			  d.Exports = +d.Exports;
			});

			// sort years ascending
			data.sort(function(a, b){
			return a["Date"]-b["Date"];
			})

			// Scale the range of the data
			x.domain(d3.extent(data, function(d) { return d.Date; }));
			y.domain([0, d3.max(data, function(d) {
			  return Math.max(d.Imports, d.Exports); })]);

			// Add the valueline path.
			svg.append("path")
			  .data([data])
			  .attr("class", "line")
			  .attr("d", valueline_solid);
			// Add the valueline path.
			svg.append("path")
			  .data([data])
			  .attr("class", "line")
			  .style("stroke-dasharray", ("3, 3")) // make dashed
			  .attr("d", valueline_dashed);  
		}

		// Get the data
		fetch("/testdata/line-data.json").then((res) => res.json()).then((data) => {
			// trigger render
			draw(data, "test");
		});
		
	}
	        
	render() {
	    return <span></span>
	}

}


export default LineGraphViz;