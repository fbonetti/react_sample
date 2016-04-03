export const PATIENT_INVALID = 'PATIENT_INVALID';
export const PATIENT_FETCHING = 'PATIENT_FETCHING';
export const PATIENT_FETCHED = 'PATIENT_FETCHED';
export const PATIENT_FETCH_FAILED = 'PATIENT_FETCH_FAILED';

function fetchPatient(patientId) {
  return (dispatch) => {
    dispatch({ type: PATIENT_FETCHING, patientId: patientId });

    return fetch('http://jsonplaceholder.typicode.com/users/' + patientId)
      .then(response => response.json())
      .then(
        (result) => dispatch({ type: PATIENT_FETCHED, result: result }),
        (error) => dispatch({ type: PATIENT_FETCH_FAILED, error: error })
      );
  }
}

function shouldFetchPatient(state, patientId) {
  const user = state.user[patientId];

  if (!user ||
    user.readyState === PATIENT_FETCH_FAILED ||
    user.readyState === PATIENT_INVALID) {
    return true;
  }

  return false;
}

export function FetchPatientIfNeeded(patientId) {
  return (dispatch, getState) => {
    if (shouldFetchPatient(getState(), patientId)) {
      return dispatch(fetchPatient(patientId));
    }
  }
}