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

			var w = chart_bounds.width / 2, // was 300
				h = chart_bounds.width / 30;  // was 50

		    var key = d3.select("#"+elemid)
		      .append("svg")
		      .attr("width", w*2)
		      .attr("height", h*2.5);

		    var legend = key.append("defs")
		      .append("svg:linearGradient")
		      .attr("id", "gradient-wb");

		      legend.append('stop')
                .attr('class', 'stop-left')
                .attr('offset', '0');

              legend.append('stop')
                .attr('class', 'stop-middle')
                .attr('offset', '0.5');

			  legend.append('stop')
				.attr('class', 'stop-right')
				.attr('offset', '1');

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



