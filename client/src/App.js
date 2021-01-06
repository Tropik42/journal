import React from 'react';
import {
  Route, 
  Switch,
  Redirect,
  // withRouter
} from 'react-router-dom'
import Todos from './containers/Todos/Todos'
import Links from './containers/Links/Links'
import Lists from './containers/Lists/Lists'
import { Component } from 'react';
import './App.css'

import Layout from './hoc/Layout/Layout'

export default class App extends Component {
    render() {
      const {history} = this.props

      return (
        <div className="App">
          <Layout>
            <Switch>
              <Route history={history} path='/todos' component={Todos}/>
              <Route history={history} path='/links' component={Links}/>
              <Route history={history} path='/lists' component={Lists}/>
              <Redirect from='/' to='/todos'/>
            </Switch>
          </Layout>
        </div>
      )
    }
}
