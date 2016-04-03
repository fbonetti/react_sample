import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PatientList from '../components/PatientList'
import * as PatientsActions from '../actions/patients';

class Patients extends Component {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(PatientsActions.fetchPatientsIfNeeded())
    ]);
  }

  componentDidMount() {
    Patients.readyOnActions(this.props.dispatch);
  }

  renderUsers() {
    const { patients } = this.props;

    if (patients.readyState === PatientsActions.PATIENTS_INVALID ||
      patients.readyState === PatientsActions.PATIENTS_FETCHING) {
      return <p>Loading...</p>;
    }

    if (patients.readyState === PatientsActions.PATIENTS_FETCH_FAILED) {
      return <p>Failed to fetch patients</p>;
    }

    return <PatientList patients={patients.list} />;
  }

  render() {
    return (
      <div>
        <Helmet title='Patients' />
        <h3>My Patients</h3>
        {this.renderUsers()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patients: state.patients
  };
}

export default connect(mapStateToProps)(Patients);