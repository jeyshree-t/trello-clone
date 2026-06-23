const Workspace = require("../models/Workspace");

const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await Workspace.create({
      name,
      description,
    });

    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find();

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    res.status(200).json(workspace);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findByIdAndDelete(id);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createWorkspace,
  getWorkspaces,
  updateWorkspace,
  deleteWorkspace,
};