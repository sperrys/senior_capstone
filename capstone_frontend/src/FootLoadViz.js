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

var colors = { 'light': '#c1c1c1', 'med': '#828282', 'med2':'#5b5b5b', 'dark': '#3d3d3d' };


function drawKey(elemid) {
	var chart_bounds = d3
		  .select("#foot-"+elemid)
		  .node()
		  .getBoundingClientRect();

	var w = chart_bounds.width / 2, // was 300
		h = chart_bounds.width / 30;  // was 50

    var key = d3.select("#footlegend-"+elemid)
      .append("svg")
      .attr("width", w*2)
      .attr("height", h*3);

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

export function drawFoot(elemid, footdata) {
		console.log("FOOT DRAW")

		var chart_bounds = d3
		  .select("#foot-"+elemid)
		  .node()
		  .getBoundingClientRect();


    var color = d3.scaleQuantize()
          .domain([0, 200]) //TODO: adjust or make dynamic
          .range(d3.range(5).map(function(d) { return "q" + d + "-5"; })); // TODO: 11 buckets??

		var dimension = chart_bounds.width / 1.5;
    var sm_r = dimension/31;
    var lg_r = dimension/25;
		var coords = [
                  /* LEFT FOOT COORDS */
                  {'x': 0.27 * dimension, 'y': 0.33 * dimension, 'r': lg_r, 'coord': '1L', 'val': 'light'},  //1L
                  {'x': 0.28 * dimension, 'y': 0.43 * dimension, 'r': lg_r, 'coord': '2L', 'val': 'dark'},   //2L
                  {'x': 0.17 * dimension, 'y': 0.46 * dimension, 'r': lg_r, 'coord': '3L', 'val': 'light'},  //3L
                  {'x': 0.06 * dimension, 'y': 0.50 * dimension, 'r': lg_r, 'coord': '4L', 'val': 'med'},    //4L
                  {'x': 0.19 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '5L', 'val': 'light'},  //5L
                  {'x': 0.125 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '6L', 'val': 'dark'},  //6L
                  {'x': 0.06 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '7L', 'val': 'light'},  //7L
                  {'x': 0.20 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '8L', 'val': 'med'},    //8L
                  {'x': 0.09 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '9L', 'val': 'light'},  //9L
                  {'x': 0.16 * dimension, 'y': 0.84 * dimension, 'r': lg_r, 'coord': '10L', 'val': 'med'},   //10L
                  /* RIGHT FOOT COORDS */
                  {'x': 0.73 * dimension, 'y': 0.33 * dimension, 'r': lg_r, 'coord': '1R', 'val': 'light'},  //1R
                  {'x': 0.72 * dimension, 'y': 0.43 * dimension, 'r': lg_r, 'coord': '2R', 'val': 'dark'},   //2R
                  {'x': 0.83 * dimension, 'y': 0.46 * dimension, 'r': lg_r, 'coord': '3R', 'val': 'light'},  //3R
                  {'x': 0.94 * dimension, 'y': 0.50 * dimension, 'r': lg_r, 'coord': '4R', 'val': 'med'},    //4R
                  {'x': 0.81 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '5R', 'val': 'light'},  //5R
                  {'x': 0.875 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '6R', 'val': 'dark'},  //6R
                  {'x': 0.94 * dimension, 'y': 0.62 * dimension, 'r': sm_r, 'coord': '7R', 'val': 'light'},  //7R
                  {'x': 0.80 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '8R', 'val': 'med'},    //8R
                  {'x': 0.91 * dimension, 'y': 0.75 * dimension, 'r': lg_r, 'coord': '9R', 'val': 'light'},  //9R
                  {'x': 0.84 * dimension, 'y': 0.84 * dimension, 'r': lg_r, 'coord': '10R', 'val': 'med'}    //10R
                  ];
		var num_circles = coords.length;
		var circles = [];

		var svg = d3.select("#foot-"+elemid).append('svg')
			.attr('width', dimension)
			.attr('height', dimension)
			.style('background-color', 'white')
			.attr('id', 'foot-'+elemid+'-viz')
      .attr("class", "GrayScale");



	    function draw_circles(coords) {
			for (var i=0; i < num_circles; i++) {
        console.log(coords[i]['coord']);
        console.log(footdata.points[coords[i]['coord']]);


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
		
}


export default FootLoadViz;