import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class App extends Component {

  render() {
    return (
      <div>
        <Helmet
          title='MyApp'
          titleTemplate='MyApp - %s'
          meta={[
            {'char-set': 'utf-8'},
            {'name': 'description', 'content': 'My super dooper dope app'}
          ]}
        />
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Brand</a>
            </div>
            <div className="collapse navbar-collapse">
              <p className="navbar-text navbar-right">
                Signed in as <a href="#" className="navbar-link">Mark Otto</a>
              </p>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;