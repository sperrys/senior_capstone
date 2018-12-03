import React, { Component } from 'react';
import './App.css';

import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';

import arrow from './images/forward-arrow.png';

import { Link } from 'react-router-dom';

class Trainee extends Component {
  render() {
    return (
    // an individual trainee for the list of trainees by session
      <Panel className="Trainee">
        <Panel.Body>
          <Row>
            <Col xs={6} md={4}><span className="Trainee-name">Member {this.props.idNum}</span></Col>
            <Col xs={6} md={8}><span className="Trainee-info">
              Total Load Averaging 
              <span className="Trainee-load">{this.props.avgLoad} lbs</span>
              <Link to="/trainee"><Image className="Trainee-arrow" src={arrow}/></Link>
              </span></Col>
          </Row>
        </Panel.Body>
      </Panel>
    );
  }
}

export default Trainee;


