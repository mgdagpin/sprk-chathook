const request = require('request');

const sendNow = (sender, jsonData, method = "post") => {
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

const sendNormal = (sender, message) => {
    message = {
        text: message
    };

    data = {
        recipient: {
            id: sender
        },
        message: message
    };

    sendNow(sender, data);
};

const sendQuickReply= (sender, message, options) => {
   
    data = {
        recipient: {
            id: sender
        },
        messaging_type: "RESPONSE",
        message: {
            text: message,
            quick_replies: [
                {
                    content_type: "text",
                    title: "Mar",
                    payload: "Mar"
                },
                {
                    content_type: "text",
                    title: "Vince",
                    payload: "Vince"
                }
            ]
        }
    }

    sendNow(sender, data);
}

const sendRequestInfo = (sender, type) => {
    data = {
        recipient: {
            id: sender
        },
        messaging_type: "RESPONSE",
        message: {
            text: "",
            quick_replies: [
                {
                    content_type: type
                }
            ]
        }
    }
}

module.exports = {sendNormal, sendQuickReply, sendRequestInfo}