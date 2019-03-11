import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class WBKeyViz extends Component {

  componentDidMount() {
    this.drawChart(this.props.elemid);
  }

	drawChart(elemid) {
		var chart_bounds = d3
		  .select("#"+elemid)
		  .node()
		  .getBoundingClientRect();

		function draw_key() {
			var colors = { "light": "#a5c7ff",
			   "med": "#5494ff",
			   "med2": "#1e72ff",
			   "dark": "#0044b7"};

			var w = chart_bounds.width / 2, // was 300
				h = chart_bounds.width / 30;  // was 50

		    var key = d3.select("#"+elemid)
		      .append("svg")
		      .attr("width", w*2)
		      .attr("height", h*2.5);

		    var legend = key.append("defs")
		      .append("svg:linearGradient")
		      .attr("id", "gradient-wb")
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
		      .style("fill", "url(#gradient-wb)")
		      .attr("transform", "translate("+h+",0)"); // was 0, 10

		    var y = d3.scaleLinear()
		      .range([w, 0])
		      .domain([10, 0]); // changes chart scale
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

		draw_key();
		
	}
	        
	render() {
	    return <span id={"#" + this.props.id}></span>
	}

}


export default WBKeyViz;



