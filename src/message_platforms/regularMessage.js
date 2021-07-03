const sendNow = require('./sendNow');


module.exports = regularMessage = (sender, message) => {
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
