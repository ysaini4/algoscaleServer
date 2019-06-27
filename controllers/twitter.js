const express = require("express");
var Twit = require("twit");
const { Twitter } = require("../models/twitter");
var config = require("../utility/configTwitter");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    var T = new Twit(config);
    let search_key = req.body.search_key;
    var params = {
      q: search_key,
      count: 100
    };
    T.get("search/tweets", params, searchedData);
    async function searchedData(err, data, response) {
      try {
        let search_data = data.statuses.map(item => {
          return {
            created_at: item.created_at,
            text: item.text,
            user: {
              screen_name: item.user.screen_name,
              favourites_count: item.user.favourites_count
            }
          };
        });
        let twitter = new Twitter({ search_key, search_data });
        const result = await twitter.save();
        res.send(result);
      } catch (e) {
        res.send({ error: e });
      }
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to Process", error: err });
  }
});
module.exports = router;
