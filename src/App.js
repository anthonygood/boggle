import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BoggleGrid from "./boggle/js/BoggleGrid.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BoggleGrid size={4} />
      </div>
    );
  }
}

export default App;
