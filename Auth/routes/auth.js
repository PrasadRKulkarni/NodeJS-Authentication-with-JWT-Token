const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../model/user');
const {registerValidation, loginValidation} = require('../validate');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

router.post('/register', async function (req, res) {
    //Validate the request body using Joi
   const isValid = registerValidation(req.body);
   if(!isValid) res.status(400).send(isValid);

   //Check if user already exists
   const userExists = await User.findOne({email : req.body.email});
   console.log(userExists);
   if(userExists)
   { 
       res.status(400).send('User already exists.');
       res.end();
   }

   //HASH Password - bcryptjs
   const salt = await bcryptjs.genSalt(10);
   const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try{
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    }
    catch(err)
    {
        res.status(400).send(err);
    }    
});

router.post('/login', async function (req, res) {
    //Validate the request body using Joi
   const isValid = loginValidation(req.body);
   if(!isValid) return res.status(400).send(isValid);

   //Check if user exists
   const userExists = await User.findOne({email : req.body.email});
   if(!userExists)
   { 
       res.status(400).send('User does not exists.');
       res.end();
   }

   //Check if password is correct
   const isValidPassword = await bcryptjs.compare(req.body.password, userExists.password);
   if(!isValidPassword) res.status(400).send('Email Or Password is incorect.');
   
    //Create & assign a token
    const db = process.env.TOKEN_SECRET || 'prasadrkulkarni';

    const token = jwt.sign({_id : userExists._id}, db);
    console.log(token);
    res.header('auth-token', token).send(token);
   //res.send('Logged in !!!');

});

module.exports = router;