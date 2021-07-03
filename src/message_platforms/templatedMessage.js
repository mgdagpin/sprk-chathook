const sendNow = require('./sendNow');

const generic = {
    template_type: "generic",
    elements: [
        {
            title: "Logitech G213 Wireless Keyboard",
            image_url: "https://cf.shopee.ph/file/77368d7cd1806a428cce015ade7fced0",
            subtitle: "Logitech G213 Prodigy Gaming Keyboard with RGB Lighting & Anti-Ghosting",
            default_action: {
                type: "web_url",
                url: "https://shopee.ph/(TOP-SELLER)-Logitech-G213-Prodigy-Gaming-Keyboard-with-RGB-Lighting-Anti-Ghosting-i.55502962.922128726",
                webview_height_ratio: "tall"
            },
            buttons: [
                {
                    "type":"postback",
                    "title":"Start Chatting",
                    "payload":"NEED_AGENT"
                }   
            ]
        },
        {
            title: "Logitech G604 Lightspeed Wireless Gaming Mouse",
            image_url: "https://cf.shopee.ph/file/6dedd895c8434f651704aa788f43b77a",
            subtitle: "Logitech G604 Lightspeed Wireless Gaming Mouse, or Bluetooth , Hero 16K Sensor, 15 Programmable",
            default_action: {
                type: "web_url",
                url: "https://shopee.ph/Logitech-G604-Lightspeed-Wireless-Gaming-Mouse-or-Bluetooth-Hero-16K-Sensor-15-Programmable-i.55502962.3216574233",
                webview_height_ratio: "tall"
            },
            buttons: [
                {
                    "type":"postback",
                    "title":"Start Chatting",
                    "payload":"NEED_AGENT"
                }   
            ]
        }
    ]
};



module.exports =  sendTemplatedGeneric = (sendTo) => {
    data = {
        recipient: {
            id: sendTo
        },
        message: {
            attachment: {
                type:"template",
                payload: generic
            }
        }
    }

    sendNow(data)
}
