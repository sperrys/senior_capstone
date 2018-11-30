import React, { Component } from 'react';
import './App.css';

class Trainee extends Component {
  render() {
    return (
    // an individual trainee for the list of trainees by session
      <div className="Trainee">
        <span>Member 0</span>
        <span> </span>
        <span>Total Load Average = 0 lbs </span>
      </div>
    );
  }
}

export default Trainee;


class TraineeData extends Component {
	render() {
		return (
			<div className="TraineeData">
				<header>Member 1</header>
			</div>
			);
	}
}
