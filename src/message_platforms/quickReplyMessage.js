const sendNow = require('./sendNow');

module.exports = sendQuickReply= (sender, message, options) => {
   
    data = {
        recipient: {
            id: sender
        },
        messaging_type: "RESPONSE",
        message: {
            text: message,
            quick_replies: options
        }
    }

    sendNow(data);
}
