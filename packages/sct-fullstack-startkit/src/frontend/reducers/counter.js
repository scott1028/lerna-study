import { ADD, SUB } from '../actions/counter';

export const initialState = {
  total: 0,
  testBtn: () => alert('click test!'),
};

/**
 * Auth Reducer
 * @param {object} state - a state of react
 * @param {object} action - a action object of redux
 * @returns {object} state - a state of react
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return Object.assign({}, state, {
        total: state.total + 1,
      });
    case SUB:
      return Object.assign({}, state, {
        total: state.total - 1,
      });
    default:
      return state;
  }
};
