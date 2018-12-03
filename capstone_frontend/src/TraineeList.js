import React, { Component } from 'react';
import Trainee from './Trainee.js'
import './App.css';

import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import TraineeListHeader from './TraineeListHeader.js';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {
          id: 1,
          dist: 1.1,
          date: "December 1, 2018",
          notes: "These are my notes",
          trainees: [{id: 1, avgLoad: 10},
           {id: 2, avgLoad: 20},
           {id: 3, avgLoad: 30}]
      }
    };
  }

  render() {
    const panelItems = this.state.data.trainees.map(function(elem) {
          return <Trainee idNum={elem.id} avgLoad={elem.avgLoad} />
        });

    return (
    	// an individual training session
      <div className="TrainineeList">
        <TraineeListHeader date={this.state.data.date} dist={this.state.data.dist}/>
  			<PanelGroup id="TrainineeListPanel">
          {panelItems}
        </PanelGroup>
      </div>
    );
  }
}

export default TraineeList;
