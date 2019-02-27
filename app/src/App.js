import React, { Component } from 'react';
import './App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import ObjectTable from './ObjectTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <ObjectTable />
            Learn React          
        </header>
      </div>
    );
  }
}

export default App;
