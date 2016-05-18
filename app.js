const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('express-nunjucks');

const routes = require('./routes/routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Configuring the template system.
nunjucks.setup({
  autoescape: true,
  throwOnUndefined: false,
  trimBlocks: false,
  lstripBlocks: false,
  watch: true,
  noCache: true,
  tags: {}
}, app);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
