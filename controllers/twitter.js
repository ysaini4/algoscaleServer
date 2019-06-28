const express = require("express");
const Twit = require("twit");
const { Twitter } = require("../models/twitter");
const { auth } = require("../middlewares/auth");
const config = require("../utility/configTwitter");
const { filterByDate } = require("../utility/common");
const router = express.Router();
router.post("/", auth, async (req, res) => {
  try {
    let { search_key, start_date, end_date } = req.body;
    let checkDup = await Twitter.findOne({
      search_key
    }).lean();
    if (checkDup) {
      checkDup.search_data = filterByDate(
        checkDup.search_data,
        start_date,
        end_date
      );
      res.send(checkDup);
      return;
    }
    var params = {
      q: `${search_key} since:${start_date}`,
      count: 100
    };
    var T = new Twit(config);
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

        let result = await twitter.save();
        if (result) {
          result.search_data = filterByDate(
            result.search_data,
            start_date,
            end_date
          );
        }
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
