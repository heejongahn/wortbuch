import React from 'react';

class TranslateLayout extends React.Component {
  constructor() {
    super();
    this.state = { words: ["apple", "banana"] };
  }
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
      <form className="pure-form">
        <input type="text" className="input pure-input-rounded"></input>
        <input type="submit" className="pure-button" value="Translate"></input>
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
