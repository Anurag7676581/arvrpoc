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
  audioUrl: {
    type: String,
  },
});

const ArModel = mongoose.model("ArModel", arModelSchema);

module.exports = ArModel;
