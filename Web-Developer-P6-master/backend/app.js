const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const connectKey = require('./connect')

app.use(express.json());

mongoose.connect('mongodb+srv://' + process.env.connect + '@cluster0.2jxbpbc.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas')
    })
    .catch((error) => {
        console.log('Error')
        console.error(error);
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = (app);