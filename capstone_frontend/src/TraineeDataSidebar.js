import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Image from 'react-bootstrap/lib/Image';

import calLight from './images/calendar-light.svg';
import calDark from './images/calendar-dark.svg';
import feetLight from './images/feet-light.svg';
import feetDark from './images/feet-dark.svg';
import barLight from './images/gait-light.svg';
import barDark from './images/gait-dark.svg';


import { Link } from 'react-router-dom';

class TraineeDataSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: true,
      feet: false,
      bar: false
    };
  }



  render() {

    function calClick(t) {
          t.setState({cal: true, feet: false, bar: false});
          var elem = document.getElementById("cal-heading");
          elem.scrollIntoView({behavior: "smooth"});
    }

    function feetClick(t) {
          t.setState({cal: false, feet: true, bar: false});
          var elem = document.getElementById("foot-heading-day");
          elem.scrollIntoView({behavior: "smooth"});
    }

    function barClick(t) {
          t.setState({cal: false, feet: false, bar: true});
          var elem = document.getElementById("gait-heading-day");
          elem.scrollIntoView({behavior: "smooth"});
    }


    return (
      // either more navbars to stack or use text feature
      <div id="sidebar-menu" className="sideBarMenuContainer">
        <div className="sidebar-sq">
            <Link id="cal-link" onClick={ () => calClick(this) } to='#'><Image id="cal-image" className="sidebar-item" src={ this.state.cal ? calLight : calDark }/></Link>
        </div>
        <div className="sidebar-sq">
            <Link id="feet-link" onClick={ () => feetClick(this)  } to='#'><Image id="feet-image" className="sidebar-item" src={this.state.feet ? feetLight : feetDark}/></Link>
        </div>
        <div className="sidebar-sq">
            <Link id="bar-link" onClick={ () => barClick(this) }to='#'><Image id="bar-image" className="sidebar-item" src={this.state.bar ? barLight : barDark}/></Link>
        </div>

      </div>
    );
  }



}

export default TraineeDataSidebar;



