import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { App, About, Dashboard, Learn, Translate } from './components'

import '../css/main.styl';

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={About}/>
      <Route path="dashboard" component={Dashboard} />
      <Route path="learn" component={Learn} />
      <Route path="translate" component={Translate} />
    </Route>
  </Router>,
  document.getElementById('main')
);
