const express = require('express')
const http = require('http')
const https = require('https')

var router = express.Router();

router.get('/', function (req, res, next) {    
    res.send('INside jira tasks is come here!');
});


/*
var express = require('express');
var bodyParser = require('body-parser')
const rp = require('request-promise');
var router = express.Router();
const http = require('http');
const https = require('https');
const axios = require('axios');


router.get('/jiratasks', function (req, res, next) {    
	console.log('inside jira tasks');
    res.send('Successfully connected to Jira Tasks');
});

/*

const { App, LogLevel } = require("@slack/bolt");

router.get('/', function (req, res, next) {    
    res.send('Successfully connected to Jira Tasks');
});

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNING_TOKEN,
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

router.post('/', function (req, res, next) {
	
 console.log(req.body.queryResult);	
	
 var intentName = req.body.queryResult.intent.displayName;
    console.log(intentName);
    try {
        switch (intentName) {	
	        case "JiraToDoIssue":
		            jirafetchtodoIssueHandler(req, res, next);
                break;	
           default:
               // logError("Unable to match intent. Received: " + intentName, req.body.originalDetectIntentRequest.payload.data.event.user, 'UNKNOWN', 'IDEA POST CALL');
                res.send("Your request wasn't found and has been logged. Thank you!");
                break; 
        }
    }catch (err) {
        console.log(err);
        res.send(err);
    }
});

/*** jira code for fetching the to do issue 
function jirafetchtodoIssueHandler(req, res, next){
	
	var options = {
		uri: 'https://billsdev.atlassian.net/rest/api/3/search?assignee=Jayakumar Chitiprolu',
		method: 'GET',
		json: true,
		auth: { username: process.env.JIRA_USERNAME, password: process.env.JIRA_PASSWORD },
		headers: {"Accept": 'application/json',}
        };
	
	return rp(options)
        .then(response => {
		var JiraResponse='';
		for(let i=0;i<Object(response.issues).length;i++){
		   if(response.issues[i].fields.status.name == 'To Do'){
			 JiraResponse +='\n*\Project*\: '+ response.issues[i].fields.project.name;	
			 JiraResponse +='\n*\Issue No*\: '+ response.issues[i].key;
			 JiraResponse +='\n*\Summary*\:'+ response.issues[i].fields.summary;				 
			 JiraResponse +='\n*\Status*\:'+ response.issues[i].fields.status.name;
			 JiraResponse +='\n*\Issue Type*\ :'+ response.issues[i].fields.issuetype.name;
			 JiraResponse +='\n*\Created On*\:'+ response.issues[i].fields.created;
			 JiraResponse +='\n*\Created By*\:'+ response.issues[i].fields.creator.displayName;		
			 JiraResponse +='\n\n';	
		   }
		}
		
		try 
		    {
			const result = app.client.chat.postMessage({
			token: process.env.TOKEN,
		        channel: 'D01F46BL5QE',
            text:"*List of To Do Issue*",
            attachments:'[{"color": "#3AA3E3","text":"' +  JiraResponse + '"}]',					
			  });
		}catch (error) {
			console.log(error);
		}
	});	
    
}

*/
module.exports = router;
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
