export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';

export function setEmail(email) {
  dispatch({ type: SET_EMAIL, email: email });
}

export function setPassword(password) {
  dispatch({ type: SET_PASSWORD, password: password });
}