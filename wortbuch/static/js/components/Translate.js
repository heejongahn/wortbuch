import React from 'react';

class TranslateLayout extends React.Component {
  constructor() {
    super();
    this.state = { words: ["Nothing now"] };
    this.translate = this.translate.bind(this);
  }
  translate(e) {
    e.preventDefault();

    let query = document.getElementById("translate-query");
    this.setState({ words: [`Search result for ${query.value}`] });
    query.value = "";
  }
  render() {
    return (
      <div id="translation">
        <TranslateForm translate={this.translate} />
        <TranslateResults words={this.state.words} />
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


export default TranslateLayout;
