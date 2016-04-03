import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import * as LoginActions from '../actions/login';

class Login extends Component {
  attemptLogin() {
    var { email, password, dispatch } = this.props;

    fetch("/login", {
      method: "POST",
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.redirect_url) {
        browserHistory.push(response.redirect_url);
      } else {
        dispatch(LoginActions.setError(response.error || "Something went wrong. Please try again."));
      }
    });
  }

  handleEmailChange(e) {
    this.props.dispatch(LoginActions.setEmail(e.target.value));
  }

  handlePasswordChange(e) {
    this.props.dispatch(LoginActions.setPassword(e.target.value));
  }

  render() {
    var { email, password, error } = this.props;

    var renderAlert = () => (
      <div className="alert alert-danger">
        {error}
      </div>
    );

    return (
      <div>
        <Helmet title="Login" />
        <div className="col-sm-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">Please login</div>
            <div className="panel-body">
              {error ? renderAlert() : null}
              <div className="form-group">
                <label className="control-label">Email</label>
                <input className="form-control"
                       type="text"
                       value={email}
                       onChange={this.handleEmailChange.bind(this)} />
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <input className="form-control"
                       type="password"
                       value={password}
                       onChange={this.handlePasswordChange.bind(this)} />
              </div>

              <div className="btn btn-primary btn-block" onClick={this.attemptLogin.bind(this)}>
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ login: { email, password, error} }) {
  return { email, password, error };
}

export default connect(mapStateToProps)(Login);