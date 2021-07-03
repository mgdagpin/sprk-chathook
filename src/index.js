'use strict';

if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'staging') {
    require('dotenv').config();
}


const morgan = require('morgan');
const express = require('express'),
    app = express(),
    sendResponse = require('./response-modules');

app.use(express.json());
app.use(express.urlencoded({urlencoded:true}));

app.use(morgan(':method :url :status'))

//Index
app.get('/', (req, res) => {
    console.log('Someone is viewing this page!');

    sendResponse.sendTemplatedGeneric(process.env.MAR_PSID);

    res.status(200).end('Hey it\'s working!');
});


// Creates the endpoint for your webhook
app.post('/webhook', (req, res) => {
let body = req.body;

console.table(body.entry);
console.table(body.entry.messaging);

if (body.object === 'page') {
    body.entry.forEach(function(entry) {
        
    // Gets the body of the webhook event
    let webhookEvent = entry.messaging[0],
        sender = webhookEvent.sender.id;

        if(webhookEvent.message && webhookEvent.message.text) {
            let text = webhookEvent.message.text,
                message_received = {
                    sender: sender,
                    message: text
                };
            console.log(message_received);

            if(message_received.message == 'normal'){
                sendResponse.sendNormal(sender, 'You say?');
            }
                
            if(message_received.message == 'option'){
                sendResponse.sendQuickReply(sender, 'Pick your beer', []);
            }
                
            if(message_received.message == 'location')
                sendResponse.sendRequestInfo(sender, 'location')
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