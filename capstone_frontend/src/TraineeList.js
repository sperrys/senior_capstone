import React, { Component } from 'react';
import Trainee from './Trainee.js'
import './App.css';

class TraineeList extends Component {
  render() {
    return (
    	// an individual training session
      <div className="TrainineeList">
			<Trainee></Trainee>
      		<Trainee></Trainee>
      		<Trainee></Trainee>
      </div>
    );
  }
}

export default TraineeList;
