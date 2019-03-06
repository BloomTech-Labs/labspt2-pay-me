import React, { Component } from 'react';
import Home from './components/home/Home';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
