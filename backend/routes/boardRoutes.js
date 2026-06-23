const express = require("express");

const router = express.Router();

const {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");

router.post("/", createBoard);
router.get("/", getBoards);
router.get("/:id", getBoardById);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);

module.exports = router;