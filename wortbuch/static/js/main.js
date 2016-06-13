import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import '../css/main.styl';

let AppContainer = React.createClass({
  render: function() {
    return (
      <div className="container app-container">
        <h1>Hello world!</h1>
      </div>
    );
  },
});

class App extends React.Component {
  render() {
    return (
      <div>
        <div id="menu" className="pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">wortbuch</Link>
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><Link to="/dashboard" className="pure-menu-link">Dashboard</Link></li>
            <li className="pure-menu-item"><Link to="/learn" className="pure-menu-link">Learn</Link></li>
            <li className="pure-menu-item"><Link to="/translate" className="pure-menu-link">Translate</Link></li>
          </ul>
        </div>
        <div id="content" className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}


class About extends React.Component {
  render() {
    return (
      <h1>Welcome to wortbuch.</h1>
    );
  }
}


class Dashboard extends React.Component {
  render() {
    return (
      <h1>Some numbers and graphs.</h1>
    );
  }
}


class Learn extends React.Component {
  render() {
    return (
      <h1>Learning something here.</h1>
    );
  }
}


class TranslateLayout extends React.Component {
  costructor() {
    super();
    this.state.words = ["apple", "banana"];
  },
  render() {
    return (
      <div id="translation">
        <TranslateForm />
        <TranslateResults words={this.state.words} />
      </div>
    );
  }
}


class TranslateForm extends React.Component {
  render() {
    return (
      <div>
        <input type="text" className="input"></input>
        <a className="btn">Translate</a>
      </div>
    );
  }
}


class TranslateResults extends React.Component {
  render() {
    let words = this.props.words;

    return (
      <ol>
        {words.map(function(word) {
          return <TranslateResult word={word} />
        })}
      </ol>
    )
  }
}

class TranslateResult extends React.Component {
  render() {
    return <li>{this.props.word}</li>
  }
}

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={About}/>
      <Route path="dashboard" component={Dashboard} />
      <Route path="learn" component={Learn} />
      <Route path="translate" component={TranslateLayout} />
    </Route>
  </Router>,
  document.getElementById('main')
);
