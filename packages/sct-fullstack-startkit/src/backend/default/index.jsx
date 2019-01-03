import express from 'express';
import session from 'express-session';

import template from './template'; // this is for create index.html with rendered react partial dom

// fake data
import usersGenerator from '../../fixtures/users';
import books from '../../fixtures/books.json';

// state of auth store
import { initialState as authInitialState } from '../../frontend/reducers/auth';

// Ref: https://github.com/expressjs/session#options
const sessCfg = {
  secret: 'mock-secret-key',
  cookie: {},
  resave: true,
  saveUninitialized: true,
};

const router = express.Router();
const users = usersGenerator();

// Helper Function to generate view of SSR
const context = {};
/**
 * ssrViewFactory
 * @param {object} req - request object of express
 * @returns {string} - html string template for response
 */
const ssrViewFactory = req => template(req.baseUrl, {
  auth: {
    ...authInitialState,
    loggedIn: req.session.loggedIn ? true : false, // eslint-disable-line
  },
}, context);

export default (app) => {
  app.use(express.static('./dist/public'));
  app.use(session(sessCfg));

  app.get('/', (req, res) => {
    if (!req.session.loggedIn) {
      return res.redirect('/login');
    }
    // get rendered omponent of pure string, renderToString invoked in this function
    return res.send(ssrViewFactory(req));
  });

  // optional Way#1: api scheme provided by pure-express
  router.get('/users', (req, res) => {
    res.send([users]);
  });

  router.post('/users', (req, res) => res.status(201).send({}));

  router.get('/users/:id', (req, res) => {
    const data = users.filter(row => row.id === req.params.id);
    if (data.length === 0) {
      return res.status(404).send({});
    }
    return res.send(data[0]);
  });

  router.delete('/users/:id', (req, res) => res.status(201).send({}));

  router.put('/users/:id', (req, res) => res.status(201).send({}));

  router.get('/users/:id/books', (req, res) => res.send(books));

  router.post('/login', (req, res) => {
    req.session.loggedIn = {
      userId: 1,
    };
    return res.status(202).send({});
  });

  router.get('/logout', (req, res) => {
    delete req.session.loggedIn;
    return res.status(202).send({});
  });

  app.use('/api', router);

  // To handle react-router and SPA mechanism
  app.use('*', (req, res, next) => {
    if (req.baseUrl.match(/\.\w+$/)) { // *.js, *.css, etc
      return next();
    }
    if (req.baseUrl.match(/^\/api\/.*\/{0,1}$/)) { // /api/**/*
      return next();
    }
    if (req.baseUrl.match(/^\/api-docs\/{0,1}$/)) { // api-docs/**/*
      return next();
    }

    if (!req.session.loggedIn && !req.baseUrl.match(/^\/login\/{0,1}/)) {
      return res.redirect('/login');
    }

    // send react router rendered view
    return res.send(ssrViewFactory(req));
  });

  return app;
};
