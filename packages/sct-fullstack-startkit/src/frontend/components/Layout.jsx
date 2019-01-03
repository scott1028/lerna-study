import PropTypes from 'prop-types';
import React from 'react';
// Switch for single page router matchmaker and then terminate match next one
import { Route, Link, Switch } from 'react-router-dom';

import AboutPage from './AboutPage';
import LoginPage from '../containers/LoginPage';
import DashboardPage from '../containers/DashboardPage';
import NotFoundPage from './NotFoundPage';

/**
 * doLogout
 * @param {func} logout - a function
 * @param {object} history - a history object from withRouter
 * @returns {void}
 */
const doLogout = (logout, history) => (e) => {
  e.preventDefault();
  fetch('/api/logout').then((resp) => {
    if (resp.status >= 400) {
      alert('Server Error');
      return;
    }
    logout();
    alert('loggedOut!!');
    history.push('/login');
  });
};

/**
 * viewAPIDoc
 * @returns {void}
 */
const viewAPIDoc = () => {
  window.location.href = '/api-docs';
};

/**
 * LayoutPage
 * @param {Boolean} loggedIn - a flag for check loggedIn or not
 * @param {func} logout - a function
 * @param {object} history - a history object from withRouter
 * @returns {React.Component} - react component
 */
const Layout = ({ loggedIn, logout, history }) => (
  <div className="container">
    {
      loggedIn
        ? (
          <div className="menuBar">
            <div><Link to="/about">About</Link></div>
            <div><Link to="/api-docs" onClick={viewAPIDoc}>API Doc</Link></div>
            <div><Link to="/no-page">Not Found Page</Link></div>
            <div><Link to="/">Dashboard</Link></div>
            <div><Link to="/logout" onClick={doLogout(logout, history)}>Logout</Link></div>
          </div>
        )
        : (
          <div className="menuBar" />
        )
    }
    <Switch>
      <Route exact path="/login" component={(LoginPage)} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/" component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <footer>
      <p>Created by: Scott.Blue</p>
      <p>
        Contact information:
        <a href="mailto:mic1028002@gmail.com">
          mic1028002@gmail.com
        </a>
        <span>.</span>
      </p>
    </footer>
  </div>
);

Layout.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default Layout;
