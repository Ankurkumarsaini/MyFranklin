const express = require('express')
const http = require('http')
const https = require('https')

var router = express.Router();

router.get('/', function (req, res, next) {    
    res.send('Router is come here!');
});

router.post('/',(req, res,next) => {
    
    console.log('franklin hit');
    var intentName = req.body.queryResult.intent.displayName;
    console.log(req.body);
    console.log(intentName);
});

module.exports = router;
