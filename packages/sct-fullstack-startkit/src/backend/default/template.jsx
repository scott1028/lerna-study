import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'; // for SSR instead of `BrowserRouter`
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import serialize from 'serialize-javascript';

import App from '../../frontend/App'; // for mixing React Rendered DOM string into template
import configureStore from '../../frontend/configureStore';

// Fix warning message, Ref: https://github.com/facebook/react/issues/10879
// Ref: https://reacttraining.com/react-router/web/guides/server-rendering
/**
 * template
 * @param {string} path - the path of request
 * @param {object} initState - a state of react
 * @param {object} context - object of react-router
 * @returns {string} - html string template for response
 */
const template = (path, initState = {}, context = {}) => {
  // set initStore to create SSR view for frontend
  const { store, persistor } = configureStore(initState);

  const ssrDOM = renderToString(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StaticRouter
          location={path}
          context={context}
        >
          <App />
        </StaticRouter>
      </PersistGate>
    </Provider>,
  );
  // The string returned from this package's single export function is
  // literal JavaScript "which can be saved to a .js" file, or be embedded
  // into an HTML document by making the content of a <script> element.
  // So... conclusiviely, it's a legal JavaScript statement.
  //
  // Caveat!! Remember to use `import` syntax for using this serialized state
  // to let webpack handle this objact or javascript statement.
  // You can try it if you switch webpack mode to `production`.
  //
  // Ref: https://github.com/yahoo/serialize-javascript
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SCT StartKit App</title>
        <script>
          window.$$STATE = ${serialize(initState)};
        </script>
        <link href="/dist.css" rel="stylesheet" type="text/css">
      </head>
      <body>
        <div id="app">${ssrDOM}</div>
        <script src="/app.dist.js"></script>
      </body>
    </html>
  `;
};

export default template;
