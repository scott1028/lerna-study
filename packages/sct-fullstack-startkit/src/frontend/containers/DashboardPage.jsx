import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DashboardPage from '../components/DashboardPage';
import { ADD, SUB } from '../actions/counter';

/**
 * mapStateToProps
 * @param {object} state - a state of react
 * @returns {void}
 */
const mapStateToProps = state => ({
  auth: {
    ...state.auth,
  },
  counter: {
    ...state.counter,
  },
});

/**
 * mapDispatchToProps
 * @param {func} dispatch - a dispatch function of store
 * @returns {void}
 */
const mapDispatchToProps = dispatch => ({
  add: () => dispatch({
    type: ADD,
  }),
  sub: () => dispatch({
    type: SUB,
  }),
});

// Ref: https://stackoverflow.com/questions/43351752/react-router-changes-url-but-not-view
// Ref: https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
