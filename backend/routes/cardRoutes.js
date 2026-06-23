const express = require("express");
const router = express.Router();

const {
  createCard,
  getCardsByList,
  updateCard,
  deleteCard,
  assignMember,
  removeMember,
} = require("../controllers/cardController");

router.post("/", createCard);
router.get("/list/:listId", getCardsByList);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);
router.put("/:id/assign", assignMember);
router.put("/:id/remove", removeMember);

module.exports = router;