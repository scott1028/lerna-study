import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Layout from '../../components/Layout';

import { mapStateToProps, mapDispatchToProps } from './stateProsMapping';

// Ref: https://edgecoders.com/react-js-frequently-faced-problems-45e7060ef884
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
