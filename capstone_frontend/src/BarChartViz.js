import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class BarChartViz extends Component {

  componentDidMount() {
    drawBar(this.props.elemid);
  }
	        
	render() {
	    return <span></span>
	}

}

export function drawBar(elemid) {
	console.log("DRAW BAR")
	var chart_bounds = d3
	  .select('#'+elemid)
	  .node()
	  .getBoundingClientRect();

	var dimension = chart_bounds.width;

	var horiz_margin = dimension / 6,
		vert_margin = dimension / 4; 

	var margin = {top: vert_margin, right: horiz_margin, bottom: vert_margin, left: horiz_margin},
	    width = dimension - margin.left - margin.right,
	    height = dimension - margin.top - margin.bottom;

	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("#"+elemid).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	   	.attr("id", elemid+"-viz")
	  	.append("g")
	    .attr("transform",
	          "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
		y = d3.scaleLinear().rangeRound([height, 0]);


	fetch("/testdata/bar-data.json").then((res) => res.json()).then((data) => {

		x.domain(data.map(function(d) { return d.foot; }));
		y.domain([0, d3.max(data, function(d) { return d.stride; })]);

		svg.append("g")
		    .attr("class", "axis axis--x")
		    .attr("transform", "translate(0," + height + ")")
		    .call(d3.axisBottom(x));

		svg.append("g")
		  	.attr("class", "axis axis--y")
		  	.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return parseInt(d); }))
		  .append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left/1.4)
			.attr("x",0 - (height / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.attr("fill", "black")
			.text("Avg Stride Length (Inches)"); 

		svg.selectAll(".bar")
		  	.data(data)
		  .enter().append("rect")
		    .attr("x", function(d) { return x(d.foot); })
		    .attr("y", function(d) { return y(d.stride); })
		    .attr("width", x.bandwidth())
		    .attr("height", function(d) { return height - y(d.stride); })
		    .attr("fill", "black")

		svg.selectAll(".barText")
			.data(data)                                 
			.enter().append("text")
			.attr("class", "barText")
			.attr("x", function(d) { return x(d.foot); })
			.attr("y", function(d) { return y(d.stride); })
			.text(function(d) { return d.stride; });

	});
}


export default BarChartViz;