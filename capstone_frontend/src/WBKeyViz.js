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

			var colors = ['#703C2D', '#B84A29', '#E66731', '#F3B355', '#F6CA67', '#FDED82', '#F5F860', '#C8F355', '#7FE631', '#48B829', '#2D7037'];

			var num_colors = colors.length;

			var w = chart_bounds.width / 1.5, // was 300
				h = chart_bounds.width / 20,  // was 50
				rect_w = w / num_colors;

		    var key = d3.select("#"+elemid)
		      .append("svg")
		      .attr("width", w*2)
		      .attr("height", h*2.5);

		    var legend = key.append("g");

		    colors.map(function(val, index) {
			    legend.append("rect")
			          .attr("width", rect_w)
			          .attr("height", h)
			          .attr("x", rect_w*index + h)
			          .attr("fill", val)
			          .attr("stroke", "black")
			          .attr("stroke-width", "0.5px")
			  });

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



