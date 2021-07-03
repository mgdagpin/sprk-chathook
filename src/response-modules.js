const regularMessage = require('./message_platforms/regularMessage'),
    { 
        sendQuickReply, 
        sendQuickReplyEmail 
    } = require('./message_platforms/quickReplyMessage'),
    sendTemplatedGeneric = require('./message_platforms/templatedMessage');


module.exports = 
{ 
    regularMessage, 
    sendQuickReply,  
    sendQuickReplyEmail, 
    sendTemplatedGeneric
 };