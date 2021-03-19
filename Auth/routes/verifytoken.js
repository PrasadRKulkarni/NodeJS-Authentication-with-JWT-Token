//This function will be added to routes which need to be protected.
const jwt = require('jsonwebtoken');

//const db = process.env.TOKEN_SECRET || 'prasadrkulkarni';

module.exports = function (req, res, next)
{
    const token = req.header('auth-token');
    
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verifed = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifed;
        next();
        
    } catch (error) {
        res.status(400).send('Invalid Token');
    }

}