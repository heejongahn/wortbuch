import React from 'react';

class TranslateLayout extends React.Component {
  constructor() {
    super();
    this.state = { results: ["Nothing now"] };
    this.translate = this.translate.bind(this);
  }
  translate(e) {
    e.preventDefault();

    let query = document.getElementById("translate-query");

    fetch(`/linguee/english/${query.value}`)
    .then(response => {
      return response.json();
    })
    .then(results => {
      this.setState({ results: [`Search result for ${results['results']}`] });
    });

    query.value = "";
  }
  render() {
    return (
      <div id="translation">
        <TranslateForm translate={this.translate} />
        <TranslateResults results={this.state.results} />
      </div>
    );
  }
}


class TranslateForm extends React.Component {
  render() {
    return (
      <form className="pure-form" onSubmit={this.props.translate}>
        <input type="text" id="translate-query" className="input pure-input-rounded"></input>
        <a className="pure-button" onClick={this.props.translate}>Translate</a>
      </form>
    );
  }
}


class TranslateResults extends React.Component {
  render() {
    let results = this.props.results;

    return (
      <ol>
        {results.map(function(result) {
          return <TranslateResult result={result} />
        })}
      </ol>
    )
  }
}


class TranslateResult extends React.Component {
  render() {
    return <li>{this.props.result}</li>
  }
}


export default TranslateLayout;
