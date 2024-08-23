const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const AsyncStorage = require('@react-native-async-storage/async-storage');

const loginController = async (req, res) => {
    console.log("controller login");
  
    try {
        const { email, password } = req.body;
  
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
  
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User does not exist" });
        }
  
        // Compare passwords
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(400).json({ error: "Invalid Password" });
        }
  
        // Generate token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '19h' });
  
        console.log("TOKEN FOR LOGIN: " + token);
  
        // Respond with success and include the token in the Authorization header
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({
            message: "Login Success",
            success: true,
            token,
        });
  
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '19h' });

        // Respond with success and include the token in the Authorization header
        const headVal = res.setHeader('Authorization', `Bearer ${token}`);



        console.log ("TOKEN FOR SIGNUP: " + token);

        //header value
        console.log(headVal);


        return res.status(200).json({
            message: "Signup Success",
            success: true,
            // Token can also be included in the response body if needed
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        });
    }
};

module.exports = { loginController, signupController };
