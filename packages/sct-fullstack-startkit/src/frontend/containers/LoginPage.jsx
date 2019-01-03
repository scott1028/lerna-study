import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginPage from '../components/LoginPage';

import { mapStateToProps, mapDispatchToProps } from './Layout/stateProsMapping';

// Ref: https://stackoverflow.com/questions/43351752/react-router-changes-url-but-not-view
// Ref: https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
