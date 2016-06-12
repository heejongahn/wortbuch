import React from 'react';
import ReactDom from 'react-dom';

let AppContainer = React.createClass({
  render: function() {
    return (
      <div className="container app-container">
        <h1>Hello world!</h1>
      </div>
    );
  },
});

ReactDom.render(
  React.createElement(AppContainer),
  document.getElementById('main')
);
