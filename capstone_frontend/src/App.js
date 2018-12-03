import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TrainingSessionList from './TrainingSessionList.js';
import TraineeList from './TraineeList';
import TraineeData from './TraineeData';

class App extends Component {

	render () {
		// TODO: pass session and trainee ids in routes
		return (
			<div className="App">
				<Router>
					<Switch>
	      				<Route exact path='/' component={TrainingSessionList}/>
	      				<Route path='/session/' component={TraineeList}/>
	      				<Route path='/trainee/' component={TraineeData}/>
	    			</Switch>
    			</Router>
			</div>
		)
	}
}

export default App;