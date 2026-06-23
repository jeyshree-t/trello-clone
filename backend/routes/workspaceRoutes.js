const express = require("express");
const router = express.Router();

const {
  createWorkspace,
  getWorkspaces,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

router.post("/", createWorkspace);
router.get("/", getWorkspaces);
router.put("/:id", updateWorkspace);
router.delete("/:id", deleteWorkspace);

module.exports = router;