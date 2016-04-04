export const PATIENT_FETCHING = 'PATIENT_FETCHING';
export const PATIENT_FETCHED = 'PATIENT_FETCHED';
export const ADD_FILE = 'ADD_FILE';

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

export function uploadFiles(patientId, files) {
  return (dispatch) => {
    var data = new FormData();
    files.forEach(file => data.append('files[]', file));

    return fetch(`/patients/${patientId}/upload`, { method: 'POST', body: data })
      .then(response => response.json())
      .then((files) => {
        dispatch({ type: ADD_FILES, files });
      });
  }
}