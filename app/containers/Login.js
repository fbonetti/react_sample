import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from '../actions/login';

class Login extends Component {
  render() {
    var { email, password } = this.props;

    return (
      <div>
        <Helmet title="Login" />
        <div className="col-sm-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">Login</div>
            <div className="panel-body">
              <div className="form-group">
                <label className="control-label">Email</label>
                <input className="form-control"
                       type="text"
                       value={email}
                       onChange={e => LoginActions.setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <input className="form-control"
                       type="text"
                       value={password}
                       onChange={e => LoginActions.setPassword(e.target.value)} />
              </div>

              <div className="btn btn-primary btn-block">
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Login);