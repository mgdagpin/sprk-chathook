const request = require('request');

const sendNow = (jsonData, method = 'post') => {
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
    console.log('Calling Send Normal Response');

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

module.exports = {sendNormalResponse}