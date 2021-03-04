require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
var favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const banksRouter = require('./routes/banks');
const donateRouter = require('./routes/donate');
const sitemapRouter = require('./routes/sitemap')

const app = express();

mongoose.connect('mongodb+srv://db.mongodb.net/documents', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we\'re connected!')
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// use ejs-locals for all ejs tamplates
app.engine('ejs', engine)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Add moment to every views
app.locals.moment = require('moment')

// Config passport and session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
// "createStrategy"
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set locals variables middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    res.locals.title = "Banks Reports"
        // set success flash message
    res.locals.success = req.session.success || '';
    delete req.session.success
        // set error flash message
    res.locals.error = req.session.error || '';
    delete req.session.error
    next()
})

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/banks', banksRouter);
app.use('/donate', donateRouter);
app.use('/sitemap.xml', sitemapRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
