import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => {
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
        {children}
      </div>
    </div>
  )
}

export default App;
