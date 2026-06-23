import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { createCard, updateCard, deleteCard } from "../services/cardService";
import CardItem from "./CardItem";

function ListColumn({ list, cards, onUpdate, onDelete, onCardsChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardDueDate, setNewCardDueDate] = useState("");
  const [newCardPriority, setNewCardPriority] = useState("Medium");

  const handleSave = () => {
    if (title.trim() === "") return;
    onUpdate(list._id, title);
    setIsEditing(false);
  };

  const handleAddCard = async () => {
    if (newCardTitle.trim() === "") return;
    try {
      await createCard(newCardTitle, newCardDescription, newCardDueDate, newCardPriority, list._id);
      setNewCardTitle("");
      setNewCardDescription("");
      setNewCardDueDate("");
      setNewCardPriority("Medium");
      setShowAddCard(false);
      onCardsChange();
    } catch (error) {
      console.error("Failed to create card:", error);
    }
  };

  const handleUpdateCard = async (cardId, title, description, dueDate, priority) => {
    try {
      await updateCard(cardId, title, description, dueDate, priority);
      onCardsChange();
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      onCardsChange();
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  return (
    <div className="list-column">
      {isEditing ? (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }} />
          <button className="btn" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: "6px" }}>Cancel</button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="list-title">{list.title}</span>
          <div>
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)} style={{ padding: "4px 8px", fontSize: "11px" }}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(list._id)} style={{ padding: "4px 8px", fontSize: "11px", marginLeft: "4px" }}>Delete</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        {cards.map((card, index) => (
          <Draggable draggableId={card._id} index={index} key={card._id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging ? 0.85 : 1,
                }}
              >
                <CardItem
                  card={card}
                  onUpdate={handleUpdateCard}
                  onDelete={handleDeleteCard}
                  onCardsChange={onCardsChange}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>

      {showAddCard ? (
        <div className="panel">
          <input
            placeholder="Card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
            autoFocus
          />
          <textarea
            placeholder="Description"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
          />
          <input
            type="date"
            value={newCardDueDate}
            onChange={(e) => setNewCardDueDate(e.target.value)}
            style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
          />
          <select
            value={newCardPriority}
            onChange={(e) => setNewCardPriority(e.target.value)}
            style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div>
            <button className="btn" onClick={handleAddCard}>Add Card</button>
            <button className="btn btn-secondary" onClick={() => setShowAddCard(false)} style={{ marginLeft: "6px" }}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="btn btn-secondary" onClick={() => setShowAddCard(true)} style={{ marginTop: "8px", width: "100%" }}>
          + Add Card
        </button>
      )}
    </div>
  );
}

export default ListColumn;