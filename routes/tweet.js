const express = require('express');
const router = express.Router();

const Twitter = require('twitter');
const TwitterKeys = require('../keys/twitterKeys');

router.post('/', (req, res, next) => {
    const client = new Twitter({
        consumer_key: TwitterKeys.consumerKey,
        consumer_secret: TwitterKeys.consumerSecret,
        access_token_key: req.user.token,
        access_token_secret: req.user.tokenSecret
    });

    const base64image = req.body.image.replace('data:image/png;base64,', '');
    if (base64image) {
        client.post('media/upload', { media_data: req.body.image.replace('data:image/png;base64,', '') }, (err, mediares, rowmediares) => {
            console.log(mediares.media_id_string);
            if (!err) {
                client.post('statuses/update', { status: req.body.tweet_text, media_ids: mediares.media_id_string }, function (error, tweet, client_res) {
                    if (error) throw error;
                });
            } else {
                throw err;
            }
        });
    }else if (req.body.tweet_text) {
        client.post('statuses/update', { status: req.body.tweet_text}, function (error, tweet, client_res) {
            if (error) throw error;
        });
    }
    res.redirect('/');
});

module.exports = router;