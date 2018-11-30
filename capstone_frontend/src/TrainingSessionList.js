import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import TrainingSession from './TrainingSession.js';
import Header from './Header.js';

import Grid from 'react-bootstrap/lib/Grid';

class TrainingSessionList extends Component {
  render() {
    return (
    	// an individual training session
      <div className="TrainingSessionList">
        <Header />
        <Grid >
  			   <TrainingSession/>
           <TrainingSession/>
        </Grid>
      </div>
    );
  }
}

export default TrainingSessionList;
