const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
  tagId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  counter: {
    type: Number,
    required: true,
    default: 0,
  },
  softDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("Tag", tagsSchema);
