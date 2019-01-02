import express from 'express';
import session from 'express-session';

// fake data
import usersGenerator from '../../fixtures/users';
import books from '../../fixtures/books.json';

// Ref: https://github.com/expressjs/session#options
const sessCfg = {
  secret: 'mock-secret-key',
  cookie: {},
  resave: true,
  saveUninitialized: true,
};

const router = express.Router();
const users = usersGenerator();

export default (app) => {
  app.use(express.static('./dist/public'));
  app.use(session(sessCfg));

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

  app.get('/', (req, res) => res.redirect('/api-docs'));

  app.use('/api', router);

  return app;
};
