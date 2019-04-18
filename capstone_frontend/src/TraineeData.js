import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

import Col from 'react-bootstrap/lib/Col';

import TraineeDataHeader from './TraineeDataHeader.js';
import TraineeDataSidebar from './TraineeDataSidebar.js';
import CalendarViz from './CalendarViz.js';
import FootLoadViz from './FootLoadViz.js';
import WBKeyViz from './WBKeyViz.js';
import WBSquareViz from './WBSquareViz.js' 
import LineGraphViz from './LineGraphViz.js';
import BarChartViz from './BarChartViz.js';




class Summary extends Component {
	render() {
		return (
			<div className="Panel-Summary">
				<div className='TraineeData-headings'>Summary Details</div>
				<div>
					<div id="summ-wellbeing"><span className="subhead">Wellbeing Index</span>
					<WBSquareViz elemid={"summ-wellbeing"}/>
					<WBKeyViz elemid={"summ-wellbeing"}/></div>
					<div id="summ-wb-descr">
						The Wellbeing Index is based off changes in foot pressure,
						gait cadence, stride length, and stride time.<br/><br/>Note: The wellbeing index is
						not a diagnoses. 
					</div>
					<div> <span className="subhead">Trends</span> </div>
					<div id="summ-trends"><LineGraphViz data={this.props.data} elemid={"summ-trends"}/> </div>
					<div id="summ-trends-descr">
						The Gait Asymmetry percentage is based off gait cadence, stride length, and stride time.
						The Load Carried weight includes the Soldier's weight and gear carried.
					</div>
				</div>
			</div>
		);
	}
}


class Calendar extends Component {
	render() {
		return (
			<div className="Panel-Cal">
				<div id="cal-heading" className='TraineeData-headings'>Choose a Date</div>
				<div>
					<div id='cal-desciption'> 
						Select a date to view the foot load and gait analysis during a 
						specific training day. Each calendar day's color corresponds with the wellbeing 
						index at that point in time.
					</div>
					<div id='cal'><CalendarViz elemid={'cal'} data={this.props.data}/></div>
				</div>
				<div id='cal-wellbeing'><WBKeyViz elemid={'cal-wellbeing'}/></div>
			</div>
		);
	}
}

class FootLoad extends Component {
	render() {
		return (
			<div className="Panel-FootLoad">
				<div id={"foot-heading-"+this.props.id} className='TraineeData-headings'>Foot Load</div>
				<div className="foot-description">
					Foot Load is the Soldier's total load measured from their shoe insoles, including both body weight and
					any additional load being carried.
				</div>
				<div>
					<div id={"foot-"+this.props.id}><FootLoadViz elemid={this.props.id} data={this.props.data}/></div>
					<div id={"footlegend-"+this.props.id}></div>
				</div>
			</div>
		);
	}
}

class GaitAsym extends Component {
	render() {
		return (
			<div className="Panel-Gait">
				<div id={"gait-heading-"+this.props.id} className='TraineeData-headings'>Gait Analysis</div>
				<div>
					<div id={"gait-length-"+this.props.id}><BarChartViz data={this.props.data["bar"]} barid={"len"} elemid={"gait-length-"+this.props.id}/></div>
					<div id={"gait-time-"+this.props.id}><BarChartViz data={this.props.data["bar"]} barid={"time"} elemid={"gait-time-"+this.props.id}/></div>
				</div>
			</div>
		);
	}
}


class AvgTab extends Component {

	render () {
		return (
			<div className="TraineeData-tab-avg">
				Aggregate Summary
			</div>)
	}
}

class DayTab extends Component {

	render () {
		return (
			<div className="TraineeData-tab-day">
				Specific Training
			</div>)
	}
}



class TraineeData extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      loading: true,
	      data: null,
	      id: props.match.params.id,
	    };
  	}


  	componentDidMount() {
  		var id = this.state.id;
  		fetch("./testdata/cal-data.json").then((res) => res.json())
  										 .then((data) => { this.setState({loading: false, data: data, id: id})});
  	}



	render() {
		var avg = "avg";
		var day = "day";

	    // if loading, send dummy div
	    if (this.state.loading)
	    	return (<div className='TraineeData'></div>);

	    // TODO: change FootLoad data to be the avg and not first elem
	    // if data already loaded, render normally

		return (
			<div className='TraineeData'>
				<TraineeDataHeader id={this.state.id}/>
				<TraineeDataSidebar/>
				<div id='TraineeDataPanel'>
				<Col id='Panel-avg' xs={6} md={6}>
					<AvgTab/>
					<Summary data={this.state.data.lines}/>
					<FootLoad id={avg} data={this.state.data.data[0]}/>
					<GaitAsym id={avg} data={this.state.data.data[0]}/>
				</Col>
				<Col id='Panel-day' xs={6} md={6}>
					<DayTab/>
					<Calendar data={this.state.data.data}/>
					<FootLoad id={day} data={this.state.data.data[0]}/>
					<GaitAsym id={day} data={this.state.data.data[0]}/>
				</Col>
				</div>
			</div>
		);
	}
}

export default TraineeData;