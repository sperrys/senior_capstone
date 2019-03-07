import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

import TraineeDataHeader from './TraineeDataHeader.js';


class Load extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Load</Panel.Heading>
				<Panel.Body><span className='TraineeData-avg'>{this.props.avg}</span> lbs. <br/>avg. load</Panel.Body>
			</Panel>
		);
	}
}


class Pace extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Pace</Panel.Heading>
				<Panel.Body><span className='TraineeData-avg'>{this.props.avg}</span> / km<br/> avg. pace</Panel.Body>
			</Panel>
		);
	}
}

class Cadence extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Cadence</Panel.Heading>
				<Panel.Body><span className='TraineeData-avg'>{this.props.avg}</span> steps / minute<br/>avg. cadence </Panel.Body>
			</Panel>
		);
	}
}

class GaitAsym extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading className='TraineeData-headings'>Gait Asymmetry</Panel.Heading>
				<Panel.Body><span className='TraineeData-avg'>{this.props.avg}</span><br/>avg. asymetry</Panel.Body>
			</Panel>
		);
	}
}


class TraineeData extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      data: [],
	      id: props.match.params.id,
	    };
  	}

	render() {
		var loadAvg = 0;
  		var paceAvg = 1;
  		var cadenceAvg = 2;
  		var gailAsymAvg = 3;

		return (
			<div className='TraineeData'>
				<TraineeDataHeader id={this.state.id}/>
				<PanelGroup id='TraineeDataPanel'>
					<Load avg={loadAvg}/>
					<Pace avg={paceAvg}/>
					<Cadence avg={cadenceAvg}/>
					<GaitAsym avg={gailAsymAvg}/>
				</PanelGroup>
			</div>
		);
	}
}

export default TraineeData;