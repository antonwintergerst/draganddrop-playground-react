import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import CatContainer from './components/CatContainer'
import DogContainer from './components/DogContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Drag and Drop Playground</h2>
        </div>
        {
          // render the protocol to allow all children to be drag and drop containers
        }
        <DragDropContextProvider backend={HTML5Backend}>
          <div>
            <p className="App-intro">
              Cat breeds rendered in a sortable vertical list.
            </p>
            <CatContainer />
            <p className="App-intro">
              Dog memes rendered in a sortable horizontal list.
            </p>
            <DogContainer />
          </div>
        </DragDropContextProvider>
      </div>
    )
  }
}

export default App
