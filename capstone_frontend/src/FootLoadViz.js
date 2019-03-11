import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class FootLoadViz extends Component {

  componentDidMount() {
    this.drawChart(this.props.elemid);
  }

	drawChart(elemid) {
		var chart_bounds = d3
		  .select("#foot-"+elemid)
		  .node()
		  .getBoundingClientRect();

		var dimension = chart_bounds.width / 2;
		var colors = { 'light': '#c1c1c1', 'med': '#828282', 'med2':'#5b5b5b', 'dark': '#3d3d3d' };
		var coords = [{'x': 0.31 * dimension, 'y': 0.45 * dimension, 'val': 'light'},  //left foot: top right
					  {'x': 0.12 * dimension, 'y': 0.50 * dimension, 'val': 'dark'},   //top left
					  {'x': 0.17 * dimension, 'y': 0.68 * dimension, 'val': 'light'},  //mid
					  {'x': 0.24 * dimension, 'y': 0.89 * dimension, 'val': 'med'},    //bottom
					  {'x': 0.88 * dimension, 'y': 0.38 * dimension, 'val': 'med'},  //right foot: top right
					  {'x': 0.70 * dimension, 'y': 0.32 * dimension, 'val': 'light'},   //top left
					  {'x': 0.82 * dimension, 'y': 0.56 * dimension, 'val': 'med'},  //mid
					  {'x': 0.74 * dimension, 'y': 0.75 * dimension, 'val': 'dark'}     //bottom
					  ];
		var num_circles = coords.length;
		var circles = [];

		var svg = d3.select("#foot-"+elemid).append('svg')
			.attr('width', dimension)
			.attr('height', dimension)
			.style('background-color', 'white');



	    function draw_circles(coords) {
			var r = dimension/15;
			for (var i=0; i < num_circles; i++) {
				var circle = svg.append("circle")
					.attr('cx', coords[i]['x'])
					.attr('cy', coords[i]['y'])
					.attr('r', r)
					.attr('fill', colors[coords[i].val]);

				circles.push(circle);
			}
		}


		function draw_key() {
			var w = chart_bounds.width / 2, // was 300
				h = chart_bounds.width / 30;  // was 50

		    var key = d3.select("#footlegend-"+elemid)
		      .append("svg")
		      .attr("width", w*2)
		      .attr("height", h*2.5);

		    var legend = key.append("defs")
		      .append("svg:linearGradient")
		      .attr("id", "gradient")
		      .attr("x1", "0%")
		      .attr("y1", "100%")
		      .attr("x2", "100%")
		      .attr("y2", "100%")
		      .attr("spreadMethod", "pad");

		    legend.append("stop")
		      .attr("offset", "0%")
		      .attr("stop-color", colors["light"])
		      .attr("stop-opacity", 1);

		    legend.append("stop")
		      .attr("offset", "33%")
		      .attr("stop-color", colors["med"])
		      .attr("stop-opacity", 1);

		    legend.append("stop")
		      .attr("offset", "66%")
		      .attr("stop-color", colors["med2"])
		      .attr("stop-opacity", 1);

		    legend.append("stop")
		      .attr("offset", "100%")
		      .attr("stop-color", colors["dark"])
		      .attr("stop-opacity", 1);

		    key.append("rect")
		      .attr("width", w)
		      .attr("height", h)
		      .style("fill", "url(#gradient)")
		      .attr("transform", "translate("+h+",0)"); // was 0, 10

		    var y = d3.scaleLinear()
		      .range([w, 0])
		      .domain([100, 0]); // changes chart scale
		      					// TODO: make dynamic or final static

		    var yAxis = d3.axisBottom()
		      .scale(y)
		      .ticks(3);

		    key.append("g")
		      .attr("class", "y axis")
		      .attr("transform", "translate("+h+","+h+")") // was 0,30
		      .call(yAxis)
		      .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 0)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("axis title");
		}

		// add footprints
		var feet = svg.append('image')
		    .attr('xlink:href', './footprints.svg')
		    .attr('width', dimension)
		    .attr('height', dimension)
		
		draw_circles(coords);
		draw_key();
		
	}
	        
	render() {
	    return <span id={"#" + this.props.id}></span>
	}

}


export default FootLoadViz;