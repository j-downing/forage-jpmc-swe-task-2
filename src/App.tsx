import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // Addition of line 13 to define boolean variable name showGraph. To be
  // Implemented in constructor to allow user to set display status of graph on webapp
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // App to be constructed with showGraph initially set to false
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // Line 38 added to ensure that graph is only rendered if
    // user clicks on "Start Streaming Data"
    if (this.state.showGraph) {
    return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // The variable x keeps track of our interval. We use it later to clear the Interval
    // Once x > 1000
    let x = 0;
    const interval = setInterval(() => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          // When we set the state, we want to set showGraph to be true. This displays the data
          // obtained from the server
          showGraph: true,
        });
      });
      x++;
      // At some point, we want the program to stop loading and updating new data.
      // This x variable lets us specify when, when used in conjunction with the if statement below
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
