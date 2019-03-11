import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class WBSquareViz extends Component {

  // TODO: fix color scale - maybe make CSS classes
  //       to also use with key

  componentDidMount() {
    this.drawChart(this.props.elemid);
  }

	drawChart(elemid) {
		var chart_bounds = d3
		  .select('#'+elemid)
		  .node()
		  .getBoundingClientRect();

		var dimension = chart_bounds.width,
			w = dimension / 1.5,
			h = dimension / 4;

		var svg = d3.select("#"+elemid).append("svg")
		    .attr("width", w)
		    .attr("height", h);

		svg.append("rect")
		      .attr("width", w)
		      .attr("height", h);
		
	}
	        
	render() {
	    return <span></span>
	}

}


export default WBSquareViz;