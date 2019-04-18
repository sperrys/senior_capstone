import React, { Component } from 'react';
import Trainee from './Trainee.js'
import './App.css';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import TraineeListHeader from './TraineeListHeader.js';
import WBKeyViz from './WBKeyViz.js';
import LineKeyViz from './LineKeyViz.js';


class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {
          dist: 1.1,
          date: "December 1, 2018",
          notes: "These are my notes",
          trainees: [{id: 1, avgLoad: 10},
           {id: 2, avgLoad: 20},
           {id: 3, avgLoad: 30}]
      }
    };
  }

  componentWillMount() {
    fetch('http://localhost:8000/api/trainees/').then(results => {
        return results.json();
      }).then(data => {
        console.log(data);
        let trainees = data.map((t) => {
          return (
            <Trainee key={t.id} id={t.id} name={t.first_name + " " + t.last_name} avgLoad={0}/>
          )
        })
        this.setState({ panelItems: trainees });
      });
  }

  render() {

    //const panelItems = this.state.data.trainees.map(function(elem) {
    //      return <Trainee id={elem.id} avgLoad={elem.avgLoad}/>
    //    });

    return (
    	// an individual training session
      <div className="TraineeList">
        <TraineeListHeader date={this.state.data.date} dist={this.state.data.dist}/>
        <Notes notes={this.state.data.notes}/>
        {this.state.panelItems}
      </div>
    );
  }
}

export default TraineeList;



class Notes extends Component {
  render () {
    var wbkey_id = "TraineeList-wbkey";
    var linekey_id = "TraineeList-linekey";

    return (
          <Row id="TraineeList-Notes">
            <Col xs={4} md={4}>
              <div className="Trainee-name">Identifier</div>
            </Col>
            <Col xs={4} md={4}>
              <div className="Trainee-name"> Well-Being Index</div>
              <div id={wbkey_id}><WBKeyViz elemid={wbkey_id}/></div>
            </Col>
            <Col xs={4} md={4}>
              <div className="Trainee-name">Trends Over Time</div> 
              <div id={linekey_id}><LineKeyViz elemid={linekey_id}/></div>
            </Col>
          </Row>
      )
  }
}
