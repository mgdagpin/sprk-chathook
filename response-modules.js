const request = require('request');

const sendNormalResponse = (sender, message) => {
    console.log('Calling Send Normal Response');

    message = {
        text: message
    };

    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN
        },
        method: 'post',
        json: {
            recipient: {
                id: sender
            },
            message: message
        }
    },
    (error, res, body) => {
        if(error){
            console.log('Error sending message: ', error);
        } else if (res.body.error) {
            console.log('Error: ', res.body.error);
        }
    })
};

module.exports = {sendNormalResponse}