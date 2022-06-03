'use strict';

const mysql = require("mysql");

const db = mysql.createConnection({
    host : process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE,
});

db.connect();

module.exports = db;