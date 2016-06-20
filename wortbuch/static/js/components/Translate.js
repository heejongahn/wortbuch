import React from 'react';

class TranslateLayout extends React.Component {
  getInitialState() {
    return { results: [] };
  }
  constructor() {
    super();
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
      this.setState({ results: results['results'] });
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

    if (results.length === 0) {
      return <h1>No result</h1>;
    }

    return (
      <div>
        {results.map(result => {
          let [dictTerm, translations] = [result.dict_term, result.translations];

          return (
            <div>
              <h1>{dictTerm}</h1>
              {translations.map(t => {
                  return <TranslateResult meaning={t.meaning} tag={t.tag}/>;
                }
              )}
            </div>
            );
          })
        }
      </div>
    );
  }
}


class TranslateResult extends React.Component {
  render() {
    return (
      <p>{`${this.props.meaning} (${this.props.tag})`}</p>
    );
  }
}


export default TranslateLayout;
