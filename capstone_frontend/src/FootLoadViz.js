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

    var l567 = { 'x': 0.125 * dimension, 'y': 0.62 * dimension, 'rx': sm_r*2.5, 'ry': sm_r*1.2 };
    var r567 = { 'x': 0.875 * dimension, 'y': 0.62 * dimension, 'rx': sm_r*2.5, 'ry': sm_r*1.2 };
    var l12  = { 'x': 0.275 * dimension, 'y': 0.37 * dimension, 'rx': sm_r*2, 'ry': sm_r*1.2 };
    var l234 = { 'x': 0.17 * dimension, 'y': 0.46 * dimension, 'rx': sm_r*4.5, 'ry': sm_r*1.5 }
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

				var circle = svg.append("circle")
					.attr('cx', coords[i]['x'])
					.attr('cy', coords[i]['y'])
					.attr('r', coords[i]['r'])
					.attr("class", function(d) { return color(footdata.points[coords[i]['coord']]); });

				circles.push(circle);
			}
		}

    function draw_ellipses(l567, r567, l12, l234) {
        // LEFT 5L/6L/7L
        var l567_grad = svg.append('svg:linearGradient')
                           .attr('id', 'l567-gradient-'+elemid); 
        
        l567_grad.append('stop')
                .attr('class', color(footdata.points['5L'])+'-stop')
                .attr('offset', '0');

        l567_grad.append('stop')
                .attr('class', color(footdata.points['6L'])+'-stop')
                .attr('offset', '0.5');

        l567_grad.append('stop')
                .attr('class', color(footdata.points['7L'])+'-stop')
                .attr('offset', '1');

        svg.append('ellipse')
          .attr('cx', l567['x'])
          .attr('cy', l567['y'])
          .attr('rx', l567['rx'])
          .attr('ry', l567['ry'])
          .style("fill", "url(#l567-gradient-"+ elemid +")");


        // RIGHT 5L/6L/7L
        var r567_grad = svg.append('svg:linearGradient')
                           .attr('id', 'r567-gradient-'+elemid); 
        
        r567_grad.append('stop')
                .attr('class', color(footdata.points['5R'])+'-stop')
                .attr('offset', '0');

        r567_grad.append('stop')
                .attr('class', color(footdata.points['6R'])+'-stop')
                .attr('offset', '0.5');

        r567_grad.append('stop')
                .attr('class', color(footdata.points['7R'])+'-stop')
                .attr('offset', '1');

       svg.append('ellipse')
          .attr('cx', r567['x'])
          .attr('cy', r567['y'])
          .attr('rx', r567['rx'])
          .attr('ry', r567['ry'])
          .style("fill", "url(#r567-gradient-"+ elemid +")");


        // // LEFT 1L/2L
        // var l12_grad = svg.append('svg:linearGradient')
        //                    .attr('id', 'l12-gradient-'+elemid); 
        
        // l12_grad.append('stop')
        //         .attr('class', color(footdata.points['1L'])+'-stop')
        //         .attr('offset', '0');

        // l12_grad.append('stop')
        //         .attr('class', color(footdata.points['2L'])+'-stop')
        //         .attr('offset', '1');

        // svg.append('ellipse')
        //   .attr('cx', l12['x'])
        //   .attr('cy', l12['y'])
        //   .attr('rx', l12['rx'])
        //   .attr('ry', l12['ry'])
        //   .style("fill", "url(#l12-gradient-"+ elemid +")")
        //   .attr("transform", "rotate(75,"+l12['x']+","+l12['y']+")"); //ROTATE

        // LEFT 5L/6L/7L
        var l234_grad = svg.append('svg:linearGradient')
                           .attr('id', 'l234-gradient-'+elemid); 
        
        l234_grad.append('stop')
                .attr('class', color(footdata.points['2L'])+'-stop')
                .attr('offset', '0');

        l234_grad.append('stop')
                .attr('class', color(footdata.points['3L'])+'-stop')
                .attr('offset', '0.5');

        l234_grad.append('stop')
                .attr('class', color(footdata.points['4L'])+'-stop')
                .attr('offset', '1');

        svg.append('ellipse')
          .attr('cx', l234['x'])
          .attr('cy', l234['y'])
          .attr('rx', l234['rx'])
          .attr('ry', l234['ry'])
          .style("fill", "url(#l234-gradient-"+ elemid +")")
          .attr("transform", "rotate(-20,"+l234['x']+","+l234['y']+")"); //ROTATE


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