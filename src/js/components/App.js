import React, { Component } from 'react'

import Dashboard from './Dashboard'

class App extends Component {
  render() {
    return (
      <div>
        { this.props.children || <Dashboard /> }
      </div>
    )
  }
}

module.exports = App
