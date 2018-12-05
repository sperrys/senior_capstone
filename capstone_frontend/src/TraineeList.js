import React, { Component } from 'react';
import Trainee from './Trainee.js'
import './App.css';

import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import TraineeListHeader from './TraineeListHeader.js';


class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {
          id: props.match.params.id,
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
    var sessionId = this.props.match.params.id;

    const panelItems = this.state.data.trainees.map(function(elem) {
          return <Trainee id={elem.id} avgLoad={elem.avgLoad} sessionId={sessionId}/>
        });

    return (
    	// an individual training session
      <div className="TrainineeList">
        <TraineeListHeader date={this.state.data.date} dist={this.state.data.dist} sessionId={sessionId}/>
  			<PanelGroup id="TrainineeListPanel">
          <Notes notes={this.state.data.notes}/>
          {panelItems}
        </PanelGroup>
      </div>
    );
  }
}

export default TraineeList;



class Notes extends Component {
  render () {
    return (
      <Panel className="Notes-panel">
        <Panel.Heading className="Notes-heading">Notes</Panel.Heading>
        <Panel.Body className="Notes-body">{this.props.notes}</Panel.Body>
      </Panel>
      )
  }
}

