'use strict';

const morgan = require('morgan');
const express = require('express'),
    app = express(),
    sendResponse = require('./response-modules');

app.use(express.json());
app.use(express.urlencoded({urlencoded:true}));

app.use(morgan(':method :url :status :res[content-type]'))

//Index
app.get('/', (req, res) => {
    console.log('Someone is viewing this page!');
    res.status(200).end('Hey it\'s working!');
});


// Creates the endpoint for your webhook
app.post('/webhook', (req, res) => {
let body = req.body;

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

            if(message_received.message == 'normal')
                sendResponse.sendNormalResponse(sender, 'You say?');
            else if(message_received.message == 'option')
                sendResponse.sendQuickResponse(sender, 'Kinsay gwapo?', []);
        }

    });

    res.status(200).send('EVENT_RECEIVED');
} else {

    res.sendStatus(404);
}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
console.log('Your app is listening on port ' + listener.address().port);
});