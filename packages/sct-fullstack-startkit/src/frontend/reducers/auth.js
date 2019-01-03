import { LOGIN, LOGOUT } from '../actions/auth';

export const initialState = {
  loggedIn: false,
  status: 'RUNNING',
  now: new Date(),
  ssrBtnClick: () => {
    // This server stored function should be passed to client side and
    // if you enable production mode of webpack, it will be minify!
    alert('This function is defined at server side!');
  },
};

/**
 * Auth Reducer
 * @param {object} state - a state of react
 * @param {object} action - a action object of redux
 * @returns {object} state - a state of react
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    default:
      return state;
  }
};
