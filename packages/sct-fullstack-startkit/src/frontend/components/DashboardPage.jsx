import PropTypes from 'prop-types';
import React from 'react';

/**
 * DashboardPage
 * @returns {React.Component} - react component
 */
const Dashboard = ({
  auth: {
    status,
    ssrBtnClick,
  },
  counter,
  add,
  sub,
}) => (
  <div className="normal-page">
    <h2>
      <p>Here is your dashboard page!!</p>
      <p>
        clicked total:
        { counter.total }
      </p>
      <button
        className="button"
        type="button"
        onClick={() => {
          add();
          console.log(status);
        }}
      >
        Add
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          sub();
        }}
      >
        Sub
      </button>
      <button
        className="button"
        type="button"
        onClick={ssrBtnClick}
      >
        SSR passed Function
      </button>
    </h2>
  </div>
);

Dashboard.propTypes = {
  add: PropTypes.func.isRequired,
  sub: PropTypes.func.isRequired,
  auth: PropTypes.object, // eslint-disable-line
  counter: PropTypes.object, // eslint-disable-line
};

export default Dashboard;
