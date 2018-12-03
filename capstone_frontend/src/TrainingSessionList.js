import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import TrainingSession from './TrainingSession.js';
import TSListHeader from './TSListHeader.js';

import PanelGroup from 'react-bootstrap/lib/PanelGroup';

class TrainingSessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [{id: 1, dist: 1.2, date: "December 1, 2018", numTrainees: 2},
           {id: 2, dist: 2.3, date: "December 2, 2018", numTrainees: 3},
           {id: 3, dist: 3.4, date: "December 3, 2018", numTrainees: 4}]
    };
  }

  render() {
    const panelItems = this.state.data.map(function(elem) {
              return <TrainingSession dist={elem.dist} numMembers={elem.numTrainees} date={elem.date} />
            });


    return (
    	// an individual training session
      <div className="TrainingSessionList">
        <TSListHeader/>
        <PanelGroup id="TrainingSessionPanel">
           {panelItems}
        </PanelGroup>
      </div>
    );
  }
}

export default TrainingSessionList;
