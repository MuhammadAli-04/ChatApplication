require('dotenv').config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    const jwtToken = req.cookies.jwtToken;
    console.log(`middlewares <> authenticateUser: jwtToken: ${jwtToken}`);
    if (!jwtToken) {
        res.status(401).send('No token provided');
    } else {
        jwt.verify(jwtToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send('User Not Authorized');
            } else {
                next();
            }
        });
    }
}

const middlewares = [
    express.json(),
    express.urlencoded({extended: true}),
    cors({
        origin: 'http://127.0.0.1:3000', // Replace with  client's origin
        credentials: true // Allowing credentials for cookies
    }),
    cookieParser(),
    express.static('public'),
    // authenticateUser
];

module.exports = {middlewares, authenticateUser};