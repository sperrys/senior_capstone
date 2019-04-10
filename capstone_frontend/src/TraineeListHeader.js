import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


class TraineeListHeader extends Component {
  render() {
    return (
      <Navbar>
        <Nav className="Header-title">
          <NavItem>
          All Soldier Profiles
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default TraineeListHeader;