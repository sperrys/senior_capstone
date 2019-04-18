import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class WBSquareViz extends Component {

  componentDidMount() {
    this.drawChart(this.props.elemid, 5);
  }

	drawChart(elemid, wbnum) {
		console.log("BOX " + elemid);
		var chart_bounds = d3
		  .select('#'+elemid)
		  .node()
		  .getBoundingClientRect();

		var dimension = chart_bounds.width,
			w = dimension / 1.5,
			h = dimension / 4,
			key_w = 1,
			offset = 0,
			num_colors = 11;



		if (elemid == "summ-wellbeing") {
			w = dimension / 8;
			h = dimension / 16;
			
			offset = chart_bounds.width / 20;  // was 50
			key_w = dimension / 1.65 / num_colors;

		}

		var svg = d3.select("#"+elemid).append("svg")
		    .attr("width", dimension)
		    .attr("height", h)
		    .attr("class", "RdYlGn");

		svg.append("rect")
			.attr("id", "rect-"+elemid)
		    .attr("width", w)
		    .attr("height", h)
		    .attr("rx", 6)
    		.attr("ry", 6)
		    .attr("class", "q"+wbnum+"-11")
		    .attr("stroke", "black")
		    .attr("stroke-width", "1px")
		    .attr("transform", "translate("+ (offset+key_w*wbnum) +",0)")
		
		svg.append("text")
		   .attr("x", w/2)
		   .attr("y", h/2)
		   .attr("class", "q"+wbnum+"-11-text")
      	   .style("text-anchor", "end")
		   .attr("transform", "translate("+ (offset+key_w*wbnum + h/4) +","+ h/4+")")
		   .text(wbnum);
		
	}
	        
	render() {
	    return <span></span>
	}

}


export default WBSquareViz;