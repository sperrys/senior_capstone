import React, { Component } from 'react';
import './App.css';

import LineGraphViz from './LineGraphViz.js';
import WBSquareViz from './WBSquareViz.js'; 

import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';

import arrow from './images/forward-arrow.png';

import { Link } from 'react-router-dom';

class Trainee extends Component {
  render() {
    var path = '/'+this.props.id;
    var line_elemid = 'line-trainee' + this.props.id;
    var wb_elemid = 'wb-trainee' + this.props.id;

    return (
    // an individual trainee for the list of trainees by session
      <Panel className="Trainee">
        <Panel.Body>
          <Row>
            <Col xs={5} md={5}><span className="Trainee-name">Soldier {this.props.id}</span></Col>
            <Col xs={2} md={2}>
              <div id={wb_elemid}><WBSquareViz elemid={wb_elemid}/></div>
            </Col>
            <Col xs={4} md={4}>
              <div id={line_elemid}><LineGraphViz elemid={line_elemid}/></div>
            </Col>
            <Col xs={1} md={1}>
            <Link to={path}><Image className="Trainee-arrow" src={arrow}/></Link>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    );
  }
}

export default Trainee;


