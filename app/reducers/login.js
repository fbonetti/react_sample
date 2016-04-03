import {
  SET_EMAIL,
  SET_PASSWORD,
} from '../actions/login';

export default function login(state = { email: '', password: '' }, action) {
  switch (action.type) {
    case SET_EMAIL:
      return Object.assign({}, state, { email: action.email })
    case SET_PASSWORD:
      return Object.assign({}, state, { password: action.password })
    default:
      return state;
  }
}