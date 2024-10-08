const mongoose = require('mongoose');
const express = require('express');
const { loginController, signupController } = require('../controller/userController');

const Router = express.Router();

Router.post("/login",loginController);
Router.post("/signup",signupController);

module.exports = Router;