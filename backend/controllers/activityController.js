const Activity = require("../models/activityModel");

// GET ACTIVITY LOG FOR A CARD
const getActivityByCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const activities = await Activity.find({ cardId })
      .populate("user", "name email")
      .sort({ createdAt: -1 }); // newest first, like a real activity feed

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActivityByCard,
};