var express = require('express');
var bodyParser = require('body-parser')
const rp = require('request-promise');
var router = express.Router();
const http = require('http');
const https = require('https');
const axios = require('axios');

const { App, LogLevel } = require("@slack/bolt");

router.get('/', function (req, res, next) {    
    res.send('Successfully connected to ideas');
});

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNING_TOKEN,
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
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
				
				try {	 
				    // Call the chat.postMessage method using the built-in WebClient
				    const result = app.client.chat.postMessage({
				      // The token you used to initialize your app
				      token: process.env.TOKEN,
				      channel: 'D01F46BL5QE',	  
					  text:'Hello world :tada:',	  
					  //attachments:'[{"color": "#3AA3E3","attachment_type": "default","pretext": "pre-hello","text": "Cool Corporate Buzz Word...""}]'
					  //as_user:true,
				      attachments:'[{"color": "#3AA3E3","author_name": "Bobby Tables","author_link": "http://flickr.com/bobby/","author_icon": "http://flickr.com/icons/bobby.jpg","text": "Cool Corporate Buzz Word..."}]',
					  //blocks:'[{"type": "section", "text": {"type": "plain_text", "text": "Hello world"}}]',
					  //icon_emoji:':chart_with_upwards_trend:'
				      // You could also use a blocks[] array to send richer content
				    });

				    // Print result, which includes information about the message (like TS)
				    console.log(result);
					return res.json({});
				  }
				  catch (error) {
				    return res.json({
						fulfillmentText: 'Could not get results at this time',
						source: 'BuzzWord'
					})
				  }
				
				/*
				return res.json({
					fulfillmentText: dataToSend,
					source: 'BuzzWord'
				})
				*/
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
	const userAccountNotification = {
		  'username': 'Error notifier', // This will appear as user name who posts the message
		  'text': 'User failed to login 3 times. Account locked for 15 minutes.', // text
		  'icon_emoji': ':bangbang:', // User icon, you can also use custom icons here
		  'attachments': [{ // this defines the attachment block, allows for better layout usage
		    'color': '#eed140', // color of the attachments sidebar.
		    'fields': [ // actual fields
		      {
			'title': 'Environment', // Custom field
			'value': 'Production', // Custom value
			'short': true // long fields will be full width
		      },
		      {
			'title': 'User ID',
			'value': '331',
			'short': true
		      }
		    ]
		  }]
		};
	const yourWebHookURL='https://hooks.slack.com/services/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';

	console.log('Sending slack message');
  try {
    const slackResponse = sendSlackMessage(yourWebHookURL, userAccountNotification);
    console.log('Message response', slackResponse);
  } catch (e) {
    console.error('There was a error with the request', e);
  }

}

/*** slack Message Functions ***/
function sendSlackMessage (webhookURL, messageBody) {
  // make sure the incoming message body can be parsed into valid JSON
  try {
    messageBody = JSON.stringify(messageBody);
  } catch (e) {
    throw new Error('Failed to stringify messageBody', e);
  }

  // Promisify the https.request
  return new Promise((resolve, reject) => {
    // general request options, we defined that it's a POST request and content is JSON
    const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    };

    // actual request
    const req = https.request(webhookURL, requestOptions, (res) => {
      let response = '';


      res.on('data', (d) => {
        response += d;
      });

      // response finished, resolve the promise with data
      res.on('end', () => {
        resolve(response);
      })
    });

    // there was an error, reject the promise
    req.on('error', (e) => {
      reject(e);
    });

    // send our message body (was parsed to JSON beforehand)
    req.write(messageBody);
    req.end();
  });
}


module.exports = router;
