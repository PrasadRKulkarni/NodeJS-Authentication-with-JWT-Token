const router = require('express').Router();
const verify = require('./routes/verifytoken');

//http://localhost:3000/api/posts

//verify is a middlewear
router.get('/', verify,  function (req, res) {
    res.send("Jsom token authorization in action !!!");

});

module.exports = router;