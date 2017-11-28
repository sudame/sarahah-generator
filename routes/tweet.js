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

    client.post('statuses/update', { status: req.body.tweet_text }, function (error, tweet, client_res) {
        if (error) throw error;
        res.redirect('/');
    });
})

module.exports = router;