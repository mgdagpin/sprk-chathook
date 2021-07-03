const sendNow = require('./sendNow');


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

    sendNow(data);
};
