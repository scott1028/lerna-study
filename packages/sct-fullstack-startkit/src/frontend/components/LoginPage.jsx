import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

/**
   * doLogin
   * @param {object} obj - a data for post
   * @param {object} login - a function
   * @param {object} history - a history object from withRouter
   * @returns {void}
   */
const doLogin = (obj, login, history) => (e) => {
  e.preventDefault();
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      contentType: 'application/json',
    },
  }).then((resp) => {
    if (resp.status >= 400) {
      alert('Server Error');
      return;
    }
    login();
    alert('loggedIn!!');
    history.push('/');
  });
};

/**
 * LayoutPage
 * @param {Boolean} loggedIn - a flag for checking loggedIn or not
 * @param {func} logout - a function
 * @param {object} history - a history object from withRouter
 * @returns {React.Component} - react component
 */
const LoginPage = ({ loggedIn, login, history }) => {
  let obj = {};
  /**
   * LayoutPage
   * @param {string} key - a input unique key
   * @returns {func} - react component
   */
  const onChange = key => (e) => {
    obj = {
      ...obj,
      [key]: e.target.value,
    };
  };
  return (
    <div className="login-page">
      <h1>Hey You guys!! ^o^</h1>
      <div className="form">
        <form className="login-form" onSubmit={doLogin(obj, login, history)}>
          <input
            id="username"
            name="username"
            placeholder="username"
            onChange={onChange('username')}
          />
          <input
            id="password"
            password="password"
            placeholder="password"
            onChange={onChange('password')}
          />
          <button type="submit">OK</button>
        </form>
        {
          loggedIn && <Redirect to="/" />
        }
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object, // eslint-disable-line
};

export default LoginPage;
