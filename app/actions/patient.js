export const PATIENT_FETCHING = 'PATIENT_FETCHING';
export const PATIENT_FETCHED = 'PATIENT_FETCHED';

export function fetchPatient(patientId) {
  return (dispatch) => {
    dispatch({ type: PATIENT_FETCHING, patientId: patientId });

    return fetch('http://localhost:3000/patients/' + patientId + '.json')
      .then(response => response.json())
      .then((patient) => {
        dispatch({ type: PATIENT_FETCHED, patient });
      })
  }
}
