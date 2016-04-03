export const PATIENTS_INVALID = 'PATIENTS_INVALID';
export const PATIENTS_FETCHING = 'PATIENTS_FETCHING';
export const PATIENTS_FETCHED = 'PATIENTS_FETCHED';
export const PATIENTS_FETCH_FAILED = 'PATIENTS_FETCH_FAILED';

function fetchPatients() {
  return (dispatch) => {
    dispatch({ type: PATIENTS_FETCHING });

    return fetch('/patients.json', { credentials: 'same-origin'})
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => dispatch({ type: PATIENTS_FETCHED, result }),
        (error) => dispatch({ type: PATIENTS_FETCH_FAILED, error })
      );
  }
}

function shouldFetchPatients(state) {
  const patients = state.patients;

  if (!patients.list ||
    patients.readyState === PATIENTS_FETCH_FAILED ||
    patients.readyState === PATIENTS_INVALID) {
    return true;
  }

  return false;
}

export function fetchPatientsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPatients(getState())) {
      return dispatch(fetchPatients());
    }
  }
}