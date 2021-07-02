const request = require('request');

const sendNow = (jsonData, method = "post") => {
    console.log(`Sending back to ${sender}`);
    console.table(jsonData);

    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN
        },
        method: method,
        json: jsonData
    },
    (error, res, body) => {
        if(error){
            console.log('Error sending message: ', error);
        } else if (res.body.error) {
            console.log('Error: ', res.body.error);
        }
    })
};

const sendNormalResponse = (sender, message) => {
    message = {
        text: message
    };

    data = {
        recipient: {
            id: sender
        },
        message: message
    };

    sendNow(data);
};

const sendQuickResponse = (sender, message, options) => {
    console.log(sender, 'SendQuickResponse Sender');
    data = {
        recipient: {
            id: sender
        },
        messaging_type: "RESPONSE",
        message: {
            text: message
        },
        quick_replies: []
    }

    data.quick_replies.push({
        content_type: "text",
        title: "Mar",
        payload: "Mar"
    })

    data.quick_replies.push({
        content_type: "text",
        title: "Vince",
        payload: "Vince"
    })

    sendNow(data);
}

module.exports = {sendNormalResponse, sendQuickResponse}