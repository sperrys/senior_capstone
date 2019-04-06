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

	var dimension = chart_bounds.width / 1.25; // CONTROL OVERALL SIZE

	var horiz_margin = dimension / 4,
		vert_margin = dimension / 5; 

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

	var tooltip = d3.select("body")
	        .append("div").attr("id", "tooltip-bar")
	        .style("position", "absolute")
	        .style("z-index", "10")
	        .style("visibility", "hidden")
	        .text("a simple tooltip");

	fetch("/testdata/bar-data.json").then((res) => res.json()).then((data) => {

		var ymax = d3.max(data, function(d) { return d.stride; });

		x.domain(data.map(function(d) { return d.foot; }));
		y.domain([0, ymax + (ymax/3)]); // addded is the extra height for bar chart styling

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
			.attr("dy", "5%")
			.style("text-anchor", "middle")
			.attr("fill", "black")
			.attr("class", "y-bar-label")
			.text("Avg Stride Length (Inches)")

		var bar_width = x.bandwidth() / 1.5;
		var bar_shift = (x.bandwidth() - bar_width) / 2;

		bars = svg.selectAll(".bar")
		  	.data(data)
		  .enter().append("rect")
		    .attr("x", function(d) { return x(d.foot) + bar_shift; })
		    .attr("y", function(d) { return y(d.stride); })
		    .attr("width", bar_width)
		    .attr("height", function(d) { return height - y(d.stride); })
		    .attr("fill", "black")

		// svg.selectAll(".barText")
		// 	.data(data)                                 
		// 	.enter().append("g")
		// 	.attr("class", "barText")
		// 	.attr("x", function(d) { return x(d.foot); })
		// 	.attr("y", function(d) { return y(d.stride); })
		// 	.append("div")
		// 	.text(function(d) { return d.stride; });

		//  Tooltip
		var bars = svg.selectAll("rect");

		bars.on("mouseover", mouseover);
		bars.on("mouseout", mouseout);


		function mouseover(d) {
			tooltip.style("visibility", "visible");
			//var percent_data = (data[d] !== undefined && data[d].avg !== undefined) ? data[d].avg : 0;
			var text = d.stride + " Inches";

			tooltip.transition()        
			            .duration(200)      
			            .style("opacity", .9);      
			tooltip.html(text)  
			            .style("left", (d3.event.pageX)+30 + "px")     
			            .style("top", (d3.event.pageY) + "px"); 
		}

		function mouseout (d) {
		tooltip.transition()        
		        .duration(500)      
		        .style("opacity", 0); 
		}

	});


}


export default BarChartViz;