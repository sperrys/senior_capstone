import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class WBSquareViz extends Component {

  // TODO: fix color scale - maybe make CSS classes
  //       to also use with key

  componentDidMount() {
    this.drawChart(this.props.elemid, 1);
  }

	drawChart(elemid, wbnum) {
		var chart_bounds = d3
		  .select('#'+elemid)
		  .node()
		  .getBoundingClientRect();

		var dimension = chart_bounds.width,
			w = dimension / 1.5,
			h = dimension / 4;

		var svg = d3.select("#"+elemid).append("svg")
		    .attr("width", w)
		    .attr("height", h)
		    .attr("class", "RdYlGn");

		svg.append("rect")
		    .attr("width", w)
		    .attr("height", h)
		    .attr("class", "q"+wbnum+"-11");
		
		svg.append("text")
		   .attr("x", w/2)
		   .attr("y", h/2)
		   .attr("class", "q"+wbnum+"-11-text")
		   .text(wbnum);
		
	}
	        
	render() {
	    return <span></span>
	}

}


export default WBSquareViz;