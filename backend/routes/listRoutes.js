const express = require("express");
const router = express.Router();

const {
  createList,
  getListsByBoard,
  updateList,
  deleteList,
} = require("../controllers/listController");

router.post("/", createList);
router.get("/board/:boardId", getListsByBoard);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

module.exports = router;