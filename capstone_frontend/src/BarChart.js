import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class BarChart extends Component {

  componentDidMount() {
    this.drawChart();
  }


	drawChart() {
	    const data = [12, 5, 6, 6, 9, 10]
	    
	    var h = 200;

	    const svg = d3.select("#"+this.props.elemid) // TODO some how pass in trainee ids to auto find ids !!
	    .append("svg")
	    .attr("width", h)
	    .attr("height", h)
	    .style("margin-left", 100);
	                  
	    svg.selectAll("rect")
	      .data(data)
	      .enter()
	      .append("rect")
	      .attr("x", (d, i) => i * 70)
	      .attr("y", (d, i) => h - 10 * d)
	      .attr("width", 65)
	      .attr("height", (d, i) => d * 10)
	      .attr("fill", "green")
	}
	        
	render() {
	    return <span id={"#" + this.props.id}></span>
	}

}


export default BarChart;