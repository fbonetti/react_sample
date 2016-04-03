import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import PatientActions from '../actions/patient';

class Patient extends Component {

  componentDidMount() {
    const { params } = this.props;
    dispatch(UserActions.fetchPatientIfNeeded(params.id));
  }

  renderPatient() {
    const { patient } = this.props;
  }

  render() {
    return (
      <div>
        <Helmet title={'test'} />
        <div>test</div>
      </div>
    );
  }
}

function mapStateToProps({ patient }) {
  return { patient };
}

export default connect(mapStateToProps)(Patient);