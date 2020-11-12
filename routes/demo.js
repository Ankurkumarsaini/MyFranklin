const express = require('express')
const http = require('http')
const https = require('https')

var router = express.Router();

router.get('/', function (req, res, next) {    
    res.send('Router is come here!');
});
module.exports = router;
