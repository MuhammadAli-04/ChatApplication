require('dotenv').config();
const databaseController = require('./databaseController');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const response = await databaseController.validateUser({email: req.body.email, password: req.body.password});
    if(response.success)
        res.status(200).send(`<p>${response.message}</p>`);
    else
        res.status(response.errorCode).send(`<p>${response.message}</p>`);
};

const register = async (req, res) => {
    try {
        const response = await databaseController.saveUser(req.body);
        if (response.success) {
            console.log(`user saved successfully: ${JSON.stringify(response.user)}`);
            let user = JSON.parse(JSON.stringify(response.user));
            delete user['_id'];
            let jwtToken = jwt.sign(user, process.env.JWT_KEY,);
            res.cookie('jwtToken', jwtToken);
            res.status(201).send(`<p>${response.message}</p>`);
        } else {
            // console.log(`userController <> register: ${response.message}`);
            res.status(response.errorCode).send(`<p>${response.message}</p>`);
        }
    } catch (error) {
        console.log(`userController <> register : ${error}`);
        res.status(500).send(`<p>Internal Server Error</p>`);
    }
};

module.exports = {login, register};