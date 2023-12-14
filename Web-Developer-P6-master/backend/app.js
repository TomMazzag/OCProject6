const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const connectKey = require('./connect')

const userRoute = require('./routes/user')
const sauceRoute = require('./routes/sauce')

app.use(express.json());

mongoose.connect('mongodb+srv://' + process.env.connect + '@cluster0.2jxbpbc.mongodb.net/OCProject6?retryWrites=true&w=majority')
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

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoute)
app.use('/api/sauces', sauceRoute)

module.exports = (app);