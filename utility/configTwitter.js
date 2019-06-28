const config = require("config");
let details = {
  consumer_key: config.get("consumer_key"),
  consumer_secret: config.get("consumer_secret"),
  access_token: config.get("access_token"),
  access_token_secret: config.get("access_token_secret")
};
module.exports = details;
