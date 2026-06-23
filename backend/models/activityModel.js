const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true, // e.g. "added a comment"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);