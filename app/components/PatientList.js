import React, { Component } from 'react';
import { Link } from 'react-router';

class PatientList extends Component {

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.props.patients.map((patient) => {
            return (
              <tr key={patient._id}>
                <td>
                  <Link to={`patient/${patient._id}`}>{patient._id}</Link>
                </td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.address}</td>
                <td>{patient.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default PatientList;