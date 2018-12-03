import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';

import edit from './images/edit.png';
import arrow from './images/forward-arrow.png'

class TrainingSession extends Component {
  render() {
    return (
	    <Panel className="TrainingSession">
	    	<Panel.Body>
		      <Row>
		      	<Col xs={6} md={4}><span className="TrainingSession-dist">{this.props.dist} km</span><br/> {this.props.date}</Col>
		        <Col xs={6} md={4}> <Image className="TrainingSession-edit" src={edit}/></Col>
		        <Col xs={6} md={4}> <span className="TrainingSession-members">{this.props.numMembers} Members <Image className="TrainingSession-arrow" src={arrow}/></span></Col>
		      </Row>
	      	</Panel.Body>
	    </Panel>
    );
  }
}

export default TrainingSession;
