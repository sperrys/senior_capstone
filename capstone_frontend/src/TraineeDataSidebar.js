import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Image from 'react-bootstrap/lib/Image';

import cal from './images/calendar-black.png';
import feet from './images/feet-black.png';
import bar from './images/bar-black.png';


import { Link } from 'react-router-dom';

class TraineeDataSidebar extends Component {
  render() {

    return (
      // either more navbars to stack or use text feature
      <div id="sidebar-menu" className="sideBarMenuContainer">
        <div className="sidebar-sq">
            <Link to='#'><Image className="sidebar-item" src={cal}/></Link>
        </div>
        <div className="sidebar-sq">
            <Link to='#foot-heading-day'><Image className="sidebar-item" src={feet}/></Link>
        </div>
        <div className="sidebar-sq">
            <Link to='#'><Image className="sidebar-item" src={bar}/></Link>
        </div>

      </div>
    );
  }
}

export default TraineeDataSidebar;



