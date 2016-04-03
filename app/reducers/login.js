import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_ERROR
} from '../actions/login';

export default function login(state = { email: '', password: '', error: '' }, action) {
  switch (action.type) {
    case SET_EMAIL:
      return Object.assign({}, state, { email: action.email });
    case SET_PASSWORD:
      return Object.assign({}, state, { password: action.password });
    case SET_ERROR:
      return Object.assign({}, state, { error: action.error });
    default:
      return state;
  }
}