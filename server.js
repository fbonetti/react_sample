const path = require('path');
const express = require('express');
const webpack = require('webpack');
const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const expressSession = require('express-session');

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

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(expressSession({
  secret: 'mySecretKey',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));

// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
server.get('/favicon.ico', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

server.get('/login', function (req, res) {
  console.log("user_id: " + req.session.user_id);
  req.session.user_id = 100;
  res.send('thanks');
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