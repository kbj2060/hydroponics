const {token, chat_id} = require('../values/telegram_conf.json')
const request = require('request');
const telegram_url = "https://api.telegram.org/bot"

class TelegramWrapper {
    post_text(text) {
        request.post({
            url : `${telegram_url}${token}/sendMessage`,
            body : {chat_id: chat_id, text: text},
            json : true
        }, function(err, res, body){
            if (err) { console.log(err) }
        })
    }
}

module.exports = {TelegramWrapper}
