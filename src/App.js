import React, { Component } from 'react';
import './App.css';
import { RestApi } from './services/rest-service';

class App extends Component {
  state = {
    result: '',
  };
  componentDidMount() {
    this.axios = new RestApi();
    this.axios
      .getStatistic()
      .then(console.log)
      .catch(console.warn);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">{this.state.result}</header>
      </div>
    );
  }
}

export default App;
