import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import edit from './images/edit.png';
import arrow from './images/forward-arrow.png'

class TrainingSession extends Component {
  render() {
    return (
      <Row className="TrainingSession">
      	<Col xs={6} md={4}>0.0 km <br/> November 30, 2018</Col>
        <Col xs={6} md={4}> <Image className="TrainingSession-edit" src={edit}/></Col>
        <Col xs={6} md={4}> 0 Members <Image className="TrainingSession-arrow" src={arrow}/></Col>
      </Row>
    );
  }
}

export default TrainingSession;
