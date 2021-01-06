import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'

import './index.css';
import App from './App';
import Todos from './containers/Todos/Todos'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);