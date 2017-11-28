var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const uuid = require('uuid');
const MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
const tweet = require('./routes/tweet')

var app = express();


// passport
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const twitterKeys = require('./keys/twitterKeys');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "sudamedame",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ db: mongoose.connection.db })
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new TwitterStrategy(twitterKeys, (token, tokenSecret, profile, done) => {
  done(null, {
    token,
    tokenSecret,
    profile
  });
}));


const users = {};
passport.serializeUser(function (user, done) {
  console.log(user.profile.id);
  const id = uuid.v4();
  users[id] = user
  done(null, id);
});

passport.deserializeUser(function (id, done) {
  const user = users[id];
  done(null, user);
});


app.use('/', index);
app.use('/tweet/', tweet);

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/token', passport.authenticate('twitter', {
  failureRedirect: '/login',
  successRedirect: '/'
}), (req, res) => {
  // console.log(req.user.token + ':' + req.user.tokenSecret);
  // res.render('index', { title: 'authenticated!' });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
