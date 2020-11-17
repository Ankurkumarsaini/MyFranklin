var express = require('express');
var bodyParser = require('body-parser')
const rp = require('request-promise');
var router = express.Router();


router.get('/', function (req, res, next) {    
    res.send('Successfully connected to ideas');
});

module.exports = router;
