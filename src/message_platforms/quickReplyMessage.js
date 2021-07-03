const sendNow = require('./sendNow');

let normalResponse = (sender, message, options) => {
   
    options = [
        {
            content_type: "text",
            title: "Budweiser",
            payload: "BUDWEISER",
            image_url: "https://th.bing.com/th?q=Budweiser+Beer+Can&w=42&h=42&c=7&rs=1&p=0&o=5&pid=1.7&mkt=en-PH&adlt=moderate"
        },
        {
            content_type: "text",
            title: "Heneiken",
            payload: "HENEIKEN",
            image_url: "https://th.bing.com/th?q=Heineken+Beer+Can&w=42&h=42&c=7&rs=1&p=0&o=5&pid=1.7&mkt=en-PH&adlt=moderate"
        },
        {
            content_type: "text",
            title: "Red Horse",
            payload: "REDHORSE",
            image_url: "https://th.bing.com/th?q=Red+Beer+Can&w=42&h=42&c=7&rs=1&p=0&o=5&pid=1.7&mkt=en-PH&adlt=moderate"
        },
    ];

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
};

let emailResponse = (sendTo, message) => {
    data = {
        recipient: {
            id: sendTo
        },
        messaging_type: "RESPONSE",
        message: {
            text: message,
            quick_replies: [
                {
                    content_type: "user_email",
                    payload: "<EMAIL_ADDRESS>"
                }
            ]
        }
    }

    sendNow(data);
};

let mobileNumberResponse = (sendTo, message) => {
    data = {
        recipient: {
            id: sendTo
        },
        messaging_type: "RESPONSE",
        message: {
            text: message,
            quick_replies: [
                {
                    content_type: "user_phone_number",
                    payload: "<PHONE_NUMBER>"
                }
            ]
        }
    }

    sendNow(data);
};

module.exports = sendQuickReply = {
    normal: normalResponse,
    email: emailResponse,
    mobile: mobileNumberResponse
}
