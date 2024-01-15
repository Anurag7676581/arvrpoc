const mongoose = require("mongoose");

const arModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  assetUrl: {
    type: String,
    required: true,
  },
  iosUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
});

const ArModel = mongoose.model("ArModel", arModelSchema);

module.exports = ArModel;
