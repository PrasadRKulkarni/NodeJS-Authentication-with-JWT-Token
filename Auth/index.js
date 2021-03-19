//Build A Node.js API Authentication With JWT Tutorial
//https://www.youtube.com/watch?v=2jqok-WgelI
//require('dotenv').config()
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const postRoute = require('./homepage-validate');
//Import Auth.js
const authRoute = require('./routes/auth'); 

const PORT = process.env.port || 3000;

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser : true, useUnifiedTopology : true, 
    useFindAndModify : true, useCreateIndex : true, 
    useFindAndModify : false
}).then (function () {
    console.log("Connection successful.");
}).catch (function (err) {
    console.log(err);
});


//Middleware
app.use(express.json());

//Route Middlewares - Not needed. Just this URL will be appended.
//It will be like - /api/user/register
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute);

app.listen(PORT, function(){
    console.log('Server is listening at port : ' + PORT);
});