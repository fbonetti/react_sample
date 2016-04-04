import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as PatientActions from '../actions/patient';
import Dropzone from 'react-dropzone';

class Patient extends Component {

  static readyOnActions(dispatch, params) {
    return Promise.all([
      dispatch(PatientActions.fetchPatient(params.id))
    ]);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    Patient.readyOnActions(dispatch, params);
  }

  onDrop(files) {
    const { dispatch, params } = this.props;
    const patientId = params.id;
    dispatch(PatientActions.uploadFiles(patientId, files));
  }

  renderPatient() {
    const { patient } = this.props;
    if (!patient) return null;

    return (
      <dl>
        <dt>Name:</dt>
        <dd>{patient.name}</dd>
        <dt>Age:</dt>
        <dd>{patient.age}</dd>
        <dt>Address:</dt>
        <dd>{patient.address}</dd>
      </dl>
    );
  }

  renderFiles() {
    var { patient: { files } } = this.props;
    files = files || [];

    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <ul>
          {files.map(file => (
            <li>
              <a href={file}>file</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title='Patient' />
        <h3>Patient</h3>
        {this.renderPatient()}
        <h3>Files</h3>
        {this.renderFiles()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient.patient
  };
}

export default connect(mapStateToProps)(Patient);