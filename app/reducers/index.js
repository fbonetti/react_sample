import { combineReducers } from 'redux';
import login from './login';
import patient from './patient';
import patients from './patients';

export default combineReducers({
  login,
  patient,
  patients
});