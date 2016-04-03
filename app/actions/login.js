export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_ERROR = 'SET_ERROR';

export function setEmail(email) {
  return { type: SET_EMAIL, email: email };
}

export function setPassword(password) {
  return { type: SET_PASSWORD, password: password };
}

export function setError(error) {
  return { type: SET_ERROR, error: error };
}