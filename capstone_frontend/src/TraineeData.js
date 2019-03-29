import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Col from 'react-bootstrap/lib/Col';

import TraineeDataHeader from './TraineeDataHeader.js';
import CalendarViz from './CalendarViz.js';
import FootLoadViz from './FootLoadViz.js';
import WBKeyViz from './WBKeyViz.js';
import LineGraphViz from './LineGraphViz.js';
import BarChartViz from './BarChartViz.js';


class Summary extends Component {
	// TODO: add box on wellbeing scale
	// TODO: Use different line graph with axes
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Summary Details</Panel.Heading>
				<Panel.Body>
					<div id="summ-wellbeing">Wellbeing Index <WBKeyViz elemid={"summ-wellbeing"}/></div>
					<div id="summ-wb-descr">
						The Wellbeing Index is based off of data collected on changes in foot pressure,
						gait cadence, stride length, and stride time.<br/><br/>Note: The wellbeing index is
						not a diagnoses. 
					</div>
					<div id="summ-trends">Trends <LineGraphViz elemid={"summ-trends"}/> </div>
					<div id="summ-trends-descr">
						These trends illustrate how their gait is varying in context with the load being
						carried. The Gait Asymmetry percentage is based off of gait cadence, stride
						length, and stride time. The Load Carried weight includes the soldier&apos;s weight
						and gear carried.
					</div>
				</Panel.Body>
			</Panel>
		);
	}
}


class Calendar extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Choose a Date</Panel.Heading>
				<Panel.Body>
					<div id='cal-desciption'> 
						Select a date to view the foot pressure and gait analysis during a 
						specific training day. Each calendar day's color corresponds with the wellbeing 
						index at that point in time.
					</div>
					<div id='cal'><CalendarViz elemid={'cal'} data={this.props.data}/></div>
				</Panel.Body>
			</Panel>
		);
	}
}

class FootLoad extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Foot Load</Panel.Heading>
				<Panel.Body>
					<div id={"footlegend-"+this.props.id}></div>
					<div id={"foot-"+this.props.id}><FootLoadViz elemid={this.props.id} data={this.props.data}/></div>
				</Panel.Body>
			</Panel>
		);
	}
}

class GaitAsym extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Gait Analysis</Panel.Heading>
				<Panel.Body>
					<div id={"gait-length-"+this.props.id}><BarChartViz elemid={"gait-length-"+this.props.id}/></div>
					<div id={"gait-time-"+this.props.id}><BarChartViz elemid={"gait-time-"+this.props.id}/></div>
				</Panel.Body>
			</Panel>
		);
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
				<PanelGroup id='TraineeDataPanel'>
				<Col xs={6} md={6}>
					<Summary/>
					<FootLoad id={avg} data={this.state.data[0]}/>
					<GaitAsym id={avg}/>
				</Col>
				<Col xs={6} md={6}>
					<Calendar data={this.state.data}/>
					<FootLoad id={day} data={this.state.data[0]}/>
					<GaitAsym id={day}/>
				</Col>
				</PanelGroup>
			</div>
		);
	}
}

export default TraineeData;