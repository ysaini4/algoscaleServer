const mongoose = require("mongoose");
const twitterSchema = new mongoose.Schema({
  search_key: {
    type: String,
    required: true
  },
  search_data: {
    type: Object,
    required: true
  }
});
const Twitter = mongoose.model("Twitter", twitterSchema);
exports.Twitter = Twitter;
