import {
  PATIENT_FETCHING,
  PATIENT_FETCHED,
  ADD_FILES
} from '../actions/patient';

export default function patient(state = {}, action) {
  switch (action.type) {
    case PATIENT_FETCHING:
      return state;
    case PATIENT_FETCHED:
      return Object.assign({}, state, {
        patient: action.patient
      });
    case ADD_FILES:
      return state;
    default:
      return state;
  }
}