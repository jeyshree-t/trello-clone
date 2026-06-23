const Card = require("../models/cardModel");
const Activity = require("../models/activityModel");

// CREATE CARD
const createCard = async (req, res) => {
  try {
    const { title, description, dueDate, priority, listId } = req.body;

    if (!title || !listId) {
      return res.status(400).json({ message: "Title and listId are required" });
    }

    const newCard = await Card.create({ title, description, dueDate, priority, listId });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL CARDS FOR A LIST
const getCardsByList = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await Card.find({ listId }).populate("members", "name email");
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CARD
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, listId } = req.body;

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (dueDate !== undefined) updateFields.dueDate = dueDate;
    if (priority !== undefined) updateFields.priority = priority;
    if (listId !== undefined) updateFields.listId = listId;

    const updatedCard = await Card.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CARD
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ASSIGN MEMBER TO CARD
const assignMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // avoid adding the same member twice
    if (card.members.includes(userId)) {
      return res.status(400).json({ message: "User already assigned to this card" });
    }

    card.members.push(userId);
    await card.save();

    await Activity.create({
      cardId: id,
      user: userId,
      action: "was assigned to this card",
    });

    const updatedCard = await Card.findById(id).populate("members", "name email");
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE MEMBER FROM CARD
const removeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    card.members = card.members.filter((memberId) => memberId.toString() !== userId);
    await card.save();

    await Activity.create({
      cardId: id,
      user: userId,
      action: "was removed from this card",
    });

    const updatedCard = await Card.findById(id).populate("members", "name email");
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCard,
  getCardsByList,
  updateCard,
  deleteCard,
  assignMember,
  removeMember,
};