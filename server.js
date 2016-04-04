const path = require('path');
const express = require('express');
const webpack = require('webpack');
const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const cookieSession = require('cookie-session')
const User = require('./app/models/user.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/myapp');

const port = process.env.PORT || 3000;
const server = express();
global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
  if (reason.stack) {
    console.error(reason.stack);
  } else {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  }
});

server.use(bodyParser.json());
server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(cookieSession({
  name: 'session',
  secret: 'super-secret-session'
}));

// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
server.get('/favicon.ico', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

server.post('/login.json', function (req, res) {
  var { email, password } = req.body;

  User.findOne({ email, password }, function (err, user) {
    if (err) {
      res.status(500);
      res.json({ error: err.message });
    } else {
      if (user) {
        req.session.userId = user._id;
        req.session.save();
        res.header('Access-Control-Allow-Credentials', 'true');

        if (user.type == "doctor") {
          res.json({ redirect_url: '/patients'});
        } else {
          res.json({ redirect_url: '/upload'});
        }
      } else {
        res.status(400);
        res.json({ error: 'Invalid email or password' });
      }
    }
  });
});

server.get('/patients/:id.json', function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, patient) {
    if (err || !patient) {
      res.status(500);
      res.json({ error: 'error' });
    } else {
      res.json(patient);
    }
  });
});

server.get('/patients.json', function (req, res) {
  User.findOne({ _id: req.session.userId }, '_id', function (err, currentUser) {
    if (err || !currentUser) {
      res.status(500);
      res.json({ error: 'not logged in' });
    } else {
      User.find({ doctorId: currentUser._id }, function (err, patients) {
        if (err || !patients) {
          res.status(500);
          res.json({ error: 'error' });
        } else {
          res.json(patients);
        }
      });
    }
  });
});

if (!process.env.NODE_ENV) {
  const compiler = webpack(config);

  server.use(dev(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  server.use(hot(compiler));
}

server.get('*', require('./app').serverMiddleware);

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});