import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class LineKeyViz
 extends Component {

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
		var width = dimension / 2,
		    height = dimension/ 4; 

		var svg = d3.select("#"+elemid).append("svg")
		    		.attr("width", width*2)
		    		.attr("height", height)
		  			.append("g");

		// set the ranges
		var line_w = width / 2,
			line_h = height;

		var x = d3.scaleTime().range([0, line_w]);
		var y1 = d3.scaleLinear().range([line_h, 0]);
		var y2 = d3.scaleLinear().range([line_h, 0]);

		var data = [{x:5, y1:20, y2:10}, {x:10, y1:20, y2:10}];

		data.forEach(function(d) {
			  d.x = +d.x;
			  d.y1 = +d.y1;
			  d.y2= +d.y2;
		});

		// define the line
		var valueline_dashed = d3.line()
		    .x(function(d) { return x(d.x); })
		    .y(function(d) { return y1(d.y1); });

		// define the line
		var valueline_solid = d3.line()
		    .x(function(d) { return x(d.x); })
		    .y(function(d) { return y2(d.y2); });

		// Scale the range of the data
		x.domain(d3.extent(data, function(d) { return d.x; }));
		y1.domain([0, d3.max(data, function(d) {
			return Math.max(d.y1); })]);
		y2.domain([0, d3.max(data, function(d) {
			return Math.max(d.y1); })]);

		// Add the valueline path.
		svg.append("path")
		  .data([data])
		  .attr("class", "line")
		  .attr("stroke", "#021449") 
		  .style("stroke-dasharray", ("3, 3")) // make dashed
		  .attr("d", valueline_dashed);

		// Add the valueline path.
		svg.append("path")
		  .data([data])
		  .attr("class", "line")
		  .attr("stroke", "#021449")
		  .attr("d", valueline_solid);  
		
		svg.append("text")
		   .attr("x", line_w*1.1)
		   .attr("y", line_h/5)
		   .attr("fill", "#021449")
		   .style("font-size", "0.7em")
		   .text("Load (lbs)");

		svg.append("text")
		   .attr("x", line_w*1.1)
		   .attr("y", line_h/1.5)
		   .attr("fill", "#021449")
		   .style("font-size", "0.7em")
		   .text("Gait Assymetry (%)");
	}
	        
	render() {
	    return <span></span>
	}

}


export default LineKeyViz;



