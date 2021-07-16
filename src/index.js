'use strict';

if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'staging') {
    require('dotenv').config();
}


const morgan = require('morgan');
const express = require('express'),
    app = express(),
    sendResponse = require('./response-modules');

const { readFileSync } = require('fs');

const homePage = readFileSync('./src/pages/index.html');

app.use(express.json());
app.use(express.urlencoded({urlencoded:true}));
app.use(morgan(':method :url :status'))

//Index
app.get('/', (req, res) => {
    console.log('Someone is viewing this page!');
    
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.write(homePage);
    res.end();
});


app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });

// Creates the endpoint for your webhook
app.post('/webhook', (req, res) => {
let body = req.body;

console.table(body.entry);

if (body.object === 'page') {
    body.entry.forEach(function(entry) {
        
    // Gets the body of the webhook event
    let webhookEvent = entry.messaging[0],
        sender = webhookEvent.sender.id;
        
        console.log(webhookEvent);

        if(webhookEvent.message && webhookEvent.message.text) {
            let text = webhookEvent.message.text,
                message_received = {
                    sender: sender,
                    message: text
                };

            console.log(message_received);

            if(message_received.message == 'normal')
                sendResponse.regularMessage(sender, 'You say?');
                
            if(message_received.message.includes('beer'))
                sendResponse.sendQuickReply.normal(sender, 'Pick your beer', []);

            if(message_received.message == 'email')
                sendResponse.sendQuickReply.email(sender, 'Please provide your email:');
                
            if(message_received.message == 'mobile')
                sendResponse.sendQuickReply.mobile(sender, 'Give me your numbaa!')

            if(message_received.message == 'more')
                sendResponse.sendTemplatedGeneric(sender)
        }

    });

    res.status(200).send('EVENT_RECEIVED');
} else {

    res.sendStatus(404);
}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});