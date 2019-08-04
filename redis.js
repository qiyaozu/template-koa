// https://www.npmjs.com/package/redis

const redis = require("redis"),
    bluebird = require('bluebird')
    client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = client
