export const ADD = 'ADD';
export const SUB = 'SUB';

/**
 * getLogin
 * @returns {object} - a redux action
 */
export function add() {
  return {
    type: ADD,
  };
}

/**
 * getLogout
 * @returns {object} - a redux action
 */
export function sub() {
  return {
    type: SUB,
  };
}
