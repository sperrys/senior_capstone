import React, { Component } from 'react';
import * as d3 from "d3"; // I know stars are bad

class FootLoadViz extends Component {

  componentDidMount() {
    drawFoot(this.props.elemid, this.props.data);
    drawKey(this.props.elemid);
  }
	        
	render() {
	    return <span id={"#" + this.props.id}></span>
	}

}

var colors = ['#FFFDE0', '#E7F6CD', '#CFECBA', '#9ACAA5', '#549D8F', '#2A7081', '#263E81', '#0A2180'];


function drawKey(elemid) {
	var chart_bounds = d3
		  .select("#foot-"+elemid)
		  .node()
		  .getBoundingClientRect();

  var num_colors = colors.length;

var w = chart_bounds.width / 1.5, // was 300
        h = chart_bounds.width / 20,
        rect_w = w / num_colors;

    var key = d3.select("#footlegend-"+elemid)
      .append("svg")
      .attr("width", w*2)
      .attr("height", h*3);
  
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
      .domain([100, 0]); // changes chart scale
      					// TODO: make dynamic or final static

    var yAxis = d3.axisBottom()
      .scale(y)
      .tickFormat(d => d + " lbs")
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

export function drawFoot(elemid, footdata) {
		var chart_bounds = d3
		  .select("#foot-"+elemid)
		  .node()
		  .getBoundingClientRect();


    var color = d3.scaleQuantize()
          .domain([0, 200]) //TODO: adjust or make dynamic???
          .range(d3.range(8).map(function(d) { return "q" + d + "-8"; }));

		var dimension = chart_bounds.width / 1.5;
    var sm_r = dimension/26;
    var lg_r = dimension/26;
		var coords = [
                  /* LEFT FOOT COORDS */
                  {'x': 0.27 * dimension, 'y': 0.33 * dimension, 'r': lg_r, 'coord': '1L'},  //1L
                  {'x': 0.28 * dimension, 'y': 0.43 * dimension, 'r': lg_r, 'coord': '2L'},  //2L
                  {'x': 0.17 * dimension, 'y': 0.46 * dimension, 'r': lg_r, 'coord': '3L'},   //3L
                  {'x': 0.06 * dimension, 'y': 0.50 * dimension, 'r': lg_r, 'coord': '4L'},   //4L
                  {'x': 0.217 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '5L'},  //5L
                  {'x': 0.14 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '6L'}, //6L
                  {'x': 0.063 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '7L'},  //7L
                  {'x': 0.20 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '8L'},   //8L
                  {'x': 0.09 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '9L'},  //9L
                  {'x': 0.16 * dimension, 'y': 0.84 * dimension, 'r': lg_r, 'coord': '10L'},   //10L
                  /* RIGHT FOOT COORDS */
                  {'x': 0.73 * dimension, 'y': 0.33 * dimension, 'r': lg_r, 'coord': '1R'},  //1R
                  {'x': 0.72 * dimension, 'y': 0.43 * dimension, 'r': lg_r, 'coord': '2R'},   //2R
                  {'x': 0.83 * dimension, 'y': 0.46 * dimension, 'r': lg_r, 'coord': '3R'},  //3R
                  {'x': 0.94 * dimension, 'y': 0.50 * dimension, 'r': lg_r, 'coord': '4R'},    //4R
                  {'x': 0.784 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '5R'},  //5R
                  {'x': 0.86 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '6R'},  //6R
                  {'x': 0.937 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '7R'},  //7R
                  {'x': 0.80 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '8R'},    //8R
                  {'x': 0.91 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '9R'},  //9R
                  {'x': 0.84 * dimension, 'y': 0.84 * dimension, 'r': lg_r, 'coord': '10R'}    //10R
                  ];

		var num_circles = coords.length;
		var circles = [];

		var svg = d3.select("#foot-"+elemid).append('svg')
			.attr('width', dimension)
			.attr('height', dimension + dimension/8)
			.style('background-color', '#F5F5F6')
			.attr('id', 'foot-'+elemid+'-viz')
      .attr("class", "GrayScale");



	  function draw_circles(coords) {
			for (var i=0; i < num_circles; i++) {

				var circle = svg.append("circle")
					.attr('cx', coords[i]['x'])
					.attr('cy', coords[i]['y'])
					.attr('r', coords[i]['r'])
					.attr("class", function(d) { return color(footdata.points[coords[i]['coord']]); });

				circles.push(circle);
			}
		}

    

		// add footprints
		var feet = svg.append('image')
		    .attr('xlink:href', './footprints.svg')
		    .attr('width', dimension)
		    .attr('height', dimension)

		draw_circles(coords);



    // add labels to feet
    // center avg label
    svg.append("g")
      .append("text")
      .attr("y", 0.62 * dimension)
      .attr("x", 0.44 * dimension)
      .attr("fill", "black")
      .attr("font-weight", "bold")
      .text(footdata.avg+" lbs")

    svg.append("g")
      .append("text")
      .attr("y", 0.62 * dimension)
      .attr("x", 0.50 * dimension)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-size", "0.8em")
      .attr("fill", "black")
      .text("Avg Total Load")

    // left foot - STILL NEEDS WORK
    svg.append("g")
      .append("text")
      .attr("y", 0.96 * dimension)
      .attr("x", 0.12 * dimension)
      .attr("fill", "black")
      .attr("font-weight", "bold")
      .text(footdata.avg+" lbs") //CHANGE TO LEFT

    svg.append("g")
      .append("text")
      .attr("y", 0.96 * dimension)
      .attr("x", 0.17 * dimension)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "0.8em")
      .text("Avg Left Foot Load")

    svg.append("g")
      .append("text")
      .attr("y", 0.96 * dimension)
      .attr("x", 0.76 * dimension)
      .attr("fill", "black")
      .attr("font-weight", "bold")
      .text(footdata.avg+" lbs") //CHANGE TO RIGHT


    svg.append("g")
      .append("text")
      .attr("y", 0.96 * dimension)
      .attr("x", 0.82 * dimension)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "0.8em")
      .text("Avg Right Foot Load")

    //draw_ellipses(l567, r567, l12, l234);
		
}


export default FootLoadViz;