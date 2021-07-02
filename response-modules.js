const request = require('request');
const graphUrl = request('graphUrl');

const sendNormalResponse = (sender, message) => {
    console.log('Calling Send Normal Response');

    message = {
        text: message
    };

    request({
        url: graphUrl,
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
        } else if (response.body.error) {
            console.log('Error: ', res.body.error);
        }
    })
}

module.exports = {sendNormalResponse}