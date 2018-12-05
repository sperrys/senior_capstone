import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class TSListHeader extends Component {
  render() {
    return (
      // header for the top of each page - maybe many classes
      // with custom headers for each page?
      <Navbar>
        <Nav className="Header-sessions">
          <NavItem>
          Recent Training Sessions
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default TSListHeader;