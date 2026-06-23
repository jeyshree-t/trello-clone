const Comment = require("../models/commentModel");
const Activity = require("../models/activityModel");

// CREATE COMMENT
const createComment = async (req, res) => {
  try {
    const { text, cardId, author } = req.body;

    if (!text || !cardId || !author) {
      return res.status(400).json({ message: "text, cardId, and author are required" });
    }

    const newComment = await Comment.create({ text, cardId, author });

    // automatically log this as an activity
    await Activity.create({
      cardId,
      user: author,
      action: "added a comment",
    });

    const populatedComment = await Comment.findById(newComment._id).populate("author", "name email");
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL COMMENTS FOR A CARD
const getCommentsByCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const comments = await Comment.find({ cardId })
      .populate("author", "name email")
      .sort({ createdAt: 1 }); // oldest first, like a real comment thread

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByCard,
};
