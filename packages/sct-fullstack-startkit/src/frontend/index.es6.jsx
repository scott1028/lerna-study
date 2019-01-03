import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import configureStore from './configureStore';

// Sometime will receive state from first response of SSR server side.
const initState = window.$$STATE || {}; // get from serialize-javascript
delete window.$$STATE;

// set initStore to create SSR view for frontend
const { store, persistor } = configureStore(initState);

// Ref: https://reactjs.org/docs/react-dom.html#hydrate
hydrate(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('#app'),
);
