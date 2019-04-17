import React, { Component } from 'react';
import * as d3 from 'd3'; // I know stars are bad
import { drawFoot } from './FootLoadViz.js'; // get function used for FootLoadViz
import { drawBar } from './BarChartViz.js';

class CalendarViz extends Component {

  componentDidMount() {
    this.drawCal(this.props.data);
  }


	drawCal(caldata) {
		console.log("in draw cal");
		console.log(caldata);

		var chart_bounds = d3
		  .select("#cal")
		  .node()
		  .getBoundingClientRect();

		var cellSize = chart_bounds.width / 10, // cell size
		  height = cellSize * 10,
		  width = cellSize * 10;

	    var no_months_in_a_row = Math.floor(width / (cellSize * 7 + 50));
	    var shift_up = cellSize * 5;
	    var shift_right = cellSize;

	    var day = d3.timeFormat("%w"), // day of the week
	        day_of_month = d3.timeFormat("%e"), // day of the month
	        day_of_year = d3.timeFormat("%j"),
	        week = d3.timeFormat("%U"), // week number of the year
	        month = d3.timeFormat("%m"), // month number
	        year = d3.timeFormat("%Y"),
	        percent = d3.format(".1%"),
	        format = d3.timeFormat("%Y-%m-%d");

	    var color = d3.scaleQuantize()
	        .domain([0, 200]) //TODO: adjust or make dynamic
	         .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

	    var svg = d3.select("#cal").selectAll("svg")
	        .data(d3.range(2019, 2020))
	        .enter()
	        .append("svg")
	        .attr("width", width)
	        .attr("height", height)
	        .attr("class", "RdYlGn")
	        .attr("id", "cal-viz")
	        .append("g")

	    var rect, month_titles, year_titles, tooltip; // need for scope and both functions to work OK

	    function draw_setup(month_to_show) {

		// ! timeDays to control date range
		rect = svg.selectAll(".day")
		  .data(function(d) { 
		    return d3.timeDays(new Date(d, month_to_show-1, 1), new Date(d, month_to_show, 1));
		  })
		.enter()
		  .append("g")
		  .attr("class", "day-g")
		  .attr("daynum", d => day(d))
		  .append("rect")
		  .attr("class", "day")
		  .attr("width", cellSize)
		  .attr("height", cellSize)
		  .attr("x", function(d) {
		    var month_padding = 1.2 * cellSize*7 * ((month(d)-1) % (no_months_in_a_row));
		    return day(d) * cellSize + month_padding + shift_right; 
		  })
		  .attr("y", function(d) { 
		    var week_diff = week(d) - week(new Date(year(d), month(d)-1, 1) );
		    var row_level = Math.ceil(month(d) / (no_months_in_a_row));
		    return (week_diff*cellSize) + row_level*cellSize*8 - cellSize/2 - shift_up;
		  })
		  .datum(format);

	    var dayg = svg.selectAll(".day-g")
	    	.append("text")
  			.attr("class", "date-label")
  			.attr("x", function(d) {
		    	var month_padding = 1.2 * cellSize*7 * ((month(d)-1) % (no_months_in_a_row));
		    	return day(d) * cellSize + month_padding + shift_right + cellSize/2; 
		  	})
  			.attr("y", function(d) { 
		    	var week_diff = week(d) - week(new Date(year(d), month(d)-1, 1) );
		    	var row_level = Math.ceil(month(d) / (no_months_in_a_row));
		    	return (week_diff*cellSize) + row_level*cellSize*8 - cellSize/2 - shift_up + cellSize/1.7;
		  	})
		  	.style("text-anchor", "middle")
  			.text(d => day_of_month(d));


	      // ! timeMonths to control date range
	      month_titles = svg.selectAll(".month-title")  // Jan, Feb, Mar and the whatnot
	            .data(function(d) { 
	              return d3.timeMonths(new Date(d, month_to_show-1, 1), new Date(d, month_to_show, 1)); })
	          .enter().append("text")
	            .text(monthTitle)
	            .attr("x", function(d, i) {
	              var month_padding = 1.2 * cellSize*7* ((month(d)-1) % (no_months_in_a_row));
	              return month_padding + shift_right*1.7;
	            })
	            .attr("y", function(d, i) {
	              var week_diff = week(d) - week(new Date(year(d), month(d)-1, 1) );
	              var row_level = Math.ceil(month(d) / (no_months_in_a_row));
	              return (week_diff*cellSize) + row_level*cellSize*8 - cellSize - shift_up;
	            })
	            .attr("class", "month-title")
	            .attr("d", monthTitle);

	      //  Tooltip Object
	      tooltip = d3.select("body")
	        .append("div").attr("id", "tooltip")
	        .style("position", "absolute")
	        .style("z-index", "10")
	        .style("visibility", "hidden")
	        .text("a simple tooltip");

	    }

		// ! Need data for calendar to be accessable by data['date-string']
		// ! date field is for foot viz
		var data = {};
		caldata.map(function (n) { data[n.date] = {avg: n.avg, points: n.points, date: n.date }});

		// get month range for data
		var months = Object.keys(data).map(function(n) { return parseInt(n.split("-")[1]) });

		// draw rectangles and stuff based on range
		draw_setup(Math.min(...months));

		rect.filter(function(d) { return d in data; })
		  .attr("class", function(d) { return "day " + color(data[d].avg); })
		  .attr("id", function(d) { return "day"+d; })
		  .select("title")
		  .text(function(d) { return d + ": " + percent(data[d].avg); });

		// highlight with square when clicked
		rect.on("click", click);

		function click(d) {
		var day = d3.select("#day"+d); // get date

			if (day._groups[0][0] == null) return; // no data
			
			// stroke was doing wierd stuff with overlapping borders,
			// so using opacity rn

			// if class there, remove class (unclick)
			if (day.classed("selected")) {
				d3.selectAll(".day")
				  .style("opacity", 1);
			} else {	// if class not there (click) - right now, all the time
				// turn down all opacity
				d3.selectAll(".day")
				  .style("opacity", 0.3)
				  .classed("selected", false);
				// opactiy in full
				day.style("opacity", 1.0)
			  	  .classed("selected", true);
			}

			// remove current foot and bar chart
			d3.select("#foot-day-viz").remove();
			d3.select("#gait-time-day-viz").remove();
			d3.select("#gait-length-day-viz").remove();

			// redraw foot and bar chart
			drawFoot("day", data[d]); 
			drawBar("gait-length-day", "len");
			drawBar("gait-time-day", "time");

		}


		//  Tooltip
		rect.on("mouseover", mouseover);
		rect.on("mouseout", mouseout);


		function mouseover(d) {
		tooltip.style("visibility", "visible");
		var percent_data = (data[d] !== undefined && data[d].avg !== undefined) ? data[d].avg : 0;
		var purchase_text = d + ": " + percent_data + " lbs";

		tooltip.transition()        
		            .duration(200)      
		            .style("opacity", .9);      
		tooltip.html(purchase_text)  
		            .style("left", (d3.event.pageX)+30 + "px")     
		            .style("top", (d3.event.pageY) + "px"); 
		}

		function mouseout (d) {
		tooltip.transition()        
		        .duration(500)      
		        .style("opacity", 0); 
		}


	    function dayTitle (t0) {
	      return t0.toString().split(" ")[2];
	    }
	    function monthTitle (t0) {
	      return t0.toLocaleString("en-us", { month: "long" });
	    }
	    function yearTitle (t0) {
	      return t0.toString().split(" ")[3];
    	}
	}
	        
	render() {
	    return <span></span>
	}

}


export default CalendarViz;