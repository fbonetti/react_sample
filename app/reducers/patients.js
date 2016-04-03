import {
  PATIENTS_INVALID,
  PATIENTS_FETCHING,
  PATIENTS_FETCHED,
  PATIENTS_FETCH_FAILED
} from '../actions/patients';

export default function patients(state = {
  readyState: PATIENTS_INVALID,
  list: null
}, action) {
  switch (action.type) {
    case PATIENTS_FETCHING:
      return Object.assign({}, state, {
        readyState: PATIENTS_FETCHING
      });
    case PATIENTS_FETCH_FAILED:
      return Object.assign({}, state, {
        readyState: PATIENTS_FETCH_FAILED,
        error: action.error
      });
    case PATIENTS_FETCHED:
      return Object.assign({}, state, {
        readyState: PATIENTS_FETCHED,
        list: action.result
      });
    default:
      return state;
  }
}