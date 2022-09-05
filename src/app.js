var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mysql = require('mysql2/promise');
const mySqlStore = require('express-mysql-session')(session);

const poolOptions = {
    connectionLimit: 10,
    password: process.env.DBPASSWORD,
    user: process.env.DBUSER,
    database: process.env.DBSCHEMA,
    host: process.env.DBHOST,
    port: process.env.DBPORT
};

const storeOptions = {
    createDatabaseTable: true
};

const authMysqlConnection = mysql.createPool(poolOptions)
const sessionStore = new mySqlStore(storeOptions, authMysqlConnection);

var indexRouter = require('./routes');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'sad',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));

app.use(indexRouter);

module.exports = app;