const express = require("express");
const router = express.Router();

const { createComment, getCommentsByCard } = require("../controllers/commentController");

router.post("/", createComment);
router.get("/card/:cardId", getCommentsByCard);

module.exports = router;