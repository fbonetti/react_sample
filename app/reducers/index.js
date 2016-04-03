import { combineReducers } from 'redux';
import users from './users';
import user from './user';
import login from './login';

export default combineReducers({
  users,
  user,
  login
});