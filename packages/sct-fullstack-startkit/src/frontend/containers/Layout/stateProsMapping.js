import { LOGIN, LOGOUT } from '../../actions/auth';

/**
 * mapStateToProps
 * @param {object} state - a state of react
 * @returns {void}
 */
export const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

/**
 * mapDispatchToProps
 * @param {func} dispatch - a dispatch function of store
 * @returns {void}
 */
export const mapDispatchToProps = dispatch => ({
  login: () => dispatch({
    type: LOGIN,
  }),
  logout: () => dispatch({
    type: LOGOUT,
  }),
});
