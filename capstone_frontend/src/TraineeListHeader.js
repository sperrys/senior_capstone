import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Image from 'react-bootstrap/lib/Image';

import arrow from "./images/back-arrow.png";

import { Link } from 'react-router-dom';

class TraineeListHeader extends Component {
  render() {
    return (
      // header for the top of TraineeList
      // TODO: fix nested a tags, also better pass info for state
      <Navbar>
        <Nav pullLeft>
          <NavItem eventKey={1} href="#">
          <Link to="/"><Image className="Header-arrow" src={arrow}/></Link>
          </NavItem>
          <NavItem eventKey={1} href="#">
          Back
          </NavItem>
        </Nav>
        <Nav className="Header-dist">
          <NavItem>
          {this.props.dist} km
          </NavItem>
        </Nav>
        <Nav className="Header-date">
          <NavItem>
          {this.props.date}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default TraineeListHeader;