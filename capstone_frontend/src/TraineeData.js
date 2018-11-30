import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

import Header from './Header.js';


class SensorBlock extends Component {
	render() {
		return (
			<Panel>
				<Panel.Heading> Load </Panel.Heading>
				<Panel.Body> 0 lbs <br/> on average </Panel.Body>
			</Panel>
		);
	}
}


class TraineeData extends Component {
	render() {
		return (
			<div className="TraineeData">
				<Header/>
				<PanelGroup>
					<SensorBlock/>
					<SensorBlock/>
					<SensorBlock/>
					<SensorBlock/>
				</PanelGroup>
			</div>
		);
	}
}

export default TraineeData;