import React, { Component } from 'react';
import TrainingSession from './TrainingSession.js'
import './App.css';

class TrainingSessionList extends Component {
  render() {
    return (
    	// an individual training session
      <div className="TrainingSessionList">
			<TrainingSession></TrainingSession>
      		<TrainingSession></TrainingSession>
      		<TrainingSession></TrainingSession>
      </div>
    );
  }
}

export default TrainingSessionList;
