import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'


const rootRoute = {
  childRoutes: [ {
    path: '/',
    component: require('./components/App'),
    childRoutes: []
  } ]
}

render((
  <Router
    history={hashHistory}
    routes={rootRoute}
  />
), document.getElementById('app'))
