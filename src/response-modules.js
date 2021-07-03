const regularMessage = require('./message_platforms/regularMessage'),
    sendQuickReply = require('./message_platforms/quickReplyMessage'),
    sendTemplatedGeneric = require('./message_platforms/templatedMessage');


module.exports = 
{ 
    regularMessage, 
    sendQuickReply,  
    sendTemplatedGeneric
 };