import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Image from 'react-bootstrap/lib/Image';


import arrow from "./images/back-arrow.png";

class TraineeDataHeader extends Component {
  render() {
    return (
      // header for the top of each page - maybe many classes
      // with custom headers for each page?
      <Navbar>
        <Nav pullLeft>
          <NavItem eventKey={1} href="#">
          <Image className="Header-arrow" src={arrow}/>
          </NavItem>
          <NavItem eventKey={1} href="#">
          Back
          </NavItem>
        </Nav>
        <Nav className="Header-trainee">
          <NavItem>
          Member {this.props.memberNum}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default TraineeDataHeader;