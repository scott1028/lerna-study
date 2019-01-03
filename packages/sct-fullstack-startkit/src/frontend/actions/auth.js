export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/**
 * getLogin
 * @returns {object} - a redux action
 */
export function getLogin() {
  return {
    type: LOGIN,
  };
}

/**
 * getLogout
 * @returns {object} - a redux action
 */
export function getLogout() {
  return {
    type: LOGOUT,
  };
}
