const express = require("express");
const router = express.Router();

const { getActivityByCard } = require("../controllers/activityController");

router.get("/card/:cardId", getActivityByCard);

module.exports = router;