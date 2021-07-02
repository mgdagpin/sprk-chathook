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
        image_url: "https://scontent.fmnl7-1.fna.fbcdn.net/v/t1.6435-9/127178578_105048408113412_7321470995271698256_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=kwrtCqbhtucAX8mmgiW&_nc_ht=scontent.fmnl7-1.fna&oh=1d3a698ead631fabab0b1279be0feff6&oe=60E49877"
    })

    data.quick_replies.push({
        content_type: "text",
        title: "Vince",
        image_url: "https://scontent.fmnl7-1.fna.fbcdn.net/v/t1.18169-9/26733436_10212888427758445_1534355346876350615_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=rrNW2Nfw7lgAX-KNTxY&_nc_ht=scontent.fmnl7-1.fna&oh=f91ad1d6f7ffa96b1731254e7a2dbb3a&oe=60E37070"
    })

    sendNow(data);
}

module.exports = {sendNormalResponse, sendQuickResponse}