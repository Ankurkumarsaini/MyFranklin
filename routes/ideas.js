var express = require('express');
var bodyParser = require('body-parser')
const rp = require('request-promise');
var router = express.Router();
const http = require('http');
const https = require('https');
const axios = require('axios');


router.get('/', function (req, res, next) {    
    res.send('Successfully connected to ideas');
});


router.post('/', function (req, res, next) {
 var intentName = req.body.queryResult.intent.displayName;
    console.log(intentName);
    try {
        switch (intentName) {	
	    case "JIRA-NewIdea":                
                addNewIdeaWithName(req, res, next);
                break;
	     case "BuzzWord":
                // corporate buzz word generator
                buzzWordHandler(req, res, next);
                break;	
	    case "MathFacts":
                mathFactsHandler(req, res, next);
                break;
		default:
               // logError("Unable to match intent. Received: " + intentName, req.body.originalDetectIntentRequest.payload.data.event.user, 'UNKNOWN', 'IDEA POST CALL');
                res.send("Your request wasn't found and has been logged. Thank you!");
                break;
		  }
	} catch (err) {
        console.log(err);
        res.send(err);
    }
});
     
/*** buzzword handler function ***/
function buzzWordHandler(req, res, next) {	
	https.get(
		'https://corporatebs-generator.sameerkumar.website/',
		responseFromAPI => {
			let completeResponse = ''
			responseFromAPI.on('data', chunk => {
				completeResponse += chunk
			})
			responseFromAPI.on('end', () => {
				
				console.log(completeResponse);
				
				//const mymath = JSON.parse(completeResponse.text);
				
				const msg = JSON.parse(completeResponse);

				let dataToSend ;
				dataToSend = `Cool Corporate Buzz Word: ${msg.phrase}`
				return res.json({
					fulfillmentText: dataToSend,
					source: 'BuzzWord'
				})
			})
		},
		error => {
			return res.json({
				fulfillmentText: 'Could not get results at this time',
				source: 'BuzzWord'
			})
		}
	)
		
}
   
/**** Maths Facts Handler function ***/

function mathFactsHandler(req, res, next) {	
	http.get(
		'http://numbersapi.com/random/math',
		responseFromAPI => {
			let completeResponse = ''
			responseFromAPI.on('data', chunk => {
				completeResponse += chunk
			})
			responseFromAPI.on('end', () => {
				
				console.log(completeResponse);
				
				//const mymath = JSON.parse(completeResponse.text);
				
				const mymath = completeResponse;

				let dataToSend ;
				dataToSend = `The Question is ${mymath}`

				return res.json({
					fulfillmentText: dataToSend,
					source: 'MathFacts'
				})
			})
		},
		error => {
			return res.json({
				fulfillmentText: 'Could not get results at this time',
				source: 'MathFacts'
			})
		}
	)
		
}

/*** Jira NewIdea  Handler Functions ***/
function addNewIdeaWithName(req, res, next) {
	const data = {
                "text": "Note: Idea has changed...",
                "attachments": [{
                    "text": "Idea has been replaced with a slash command and is accessable by typing\n/idea",
                    "fallback": "Idea has been replaced with a slash command and is accessable by typing\n/idea",
                    "color": "#3AA3E3",
                    "attachment_type": "default",

                }]
            }
/** sending  data to the slack bot ***/
const response=axios.post('https://hooks.slack.com/services/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',data);
}


module.exports = router;
