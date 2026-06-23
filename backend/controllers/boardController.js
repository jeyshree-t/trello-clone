const Board = require("../models/boardModel");

const createBoard = async (req, res) => {
  try {
    const { name, workspaceId } = req.body;

    const board = await Board.create({
      name,
      workspaceId,
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find();

    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findByIdAndDelete(id);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json({
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getBoardById = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findById(id);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  getBoardById,
};