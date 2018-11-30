import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
//import TrainingSessionList from './TrainingSessionList.js';
import TraineeData from './TraineeData.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TraineeData />, document.getElementById('root'));
//ReactDOM.render(<TrainingSessionList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
