const List = require("../models/listModel");

// CREATE LIST
const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ message: "Title and boardId are required" });
    }

    const newList = await List.create({ title, boardId });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL LISTS FOR A BOARD
const getListsByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await List.find({ boardId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE LIST
const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedList = await List.findByIdAndUpdate(id, { title }, { new: true });

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE LIST
const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedList = await List.findByIdAndDelete(id);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createList,
  getListsByBoard,
  updateList,
  deleteList,
};