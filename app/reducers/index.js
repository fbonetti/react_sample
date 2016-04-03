import { combineReducers } from 'redux';
import patients from './patients';
import login from './login';

export default combineReducers({
  patients,
  login
});