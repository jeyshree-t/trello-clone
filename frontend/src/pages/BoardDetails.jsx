import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { getListsByBoard, createList, updateList, deleteList } from "../services/listService";
import { getCardsByList, moveCard } from "../services/cardService";
import { getBoardById, updateBoard } from "../services/boardService";
import ListColumn from "../components/ListColumn";

function BoardDetails() {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [cardsByList, setCardsByList] = useState({});
  const [newListTitle, setNewListTitle] = useState("");

  const [board, setBoard] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  useEffect(() => {
    fetchListsAndCards();
    fetchBoard();
  }, [id]);

  const fetchBoard = async () => {
    try {
      const data = await getBoardById(id);
      setBoard(data);
      setBoardName(data?.name || "");
      setBoardDescription(data?.description || "");
    } catch (error) {
      console.error("Failed to fetch board:", error);
    }
  };

  const fetchListsAndCards = async () => {
    try {
      const listsData = await getListsByBoard(id);
      setLists(listsData);
      const cardsMap = {};
      for (const list of listsData) {
        const cards = await getCardsByList(list._id);
        cardsMap[list._id] = cards;
      }
      setCardsByList(cardsMap);
    } catch (error) {
      console.error("Failed to fetch lists/cards:", error);
    }
  };

  const handleSaveSettings = async () => {
    if (boardName.trim() === "") return;
    try {
      const updated = await updateBoard(id, boardName, boardDescription);
      setBoard(updated);
      setShowSettings(false);
    } catch (error) {
      console.error("Failed to update board:", error);
    }
  };

  const handleAddList = async () => {
    if (newListTitle.trim() === "") return;
    try {
      await createList(newListTitle, id);
      setNewListTitle("");
      fetchListsAndCards();
    } catch (error) {
      console.error("Failed to create list:", error);
    }
  };

  const handleUpdateList = async (listId, title) => {
    try {
      await updateList(listId, title);
      fetchListsAndCards();
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      fetchListsAndCards();
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  const refreshListCards = async (listId) => {
    try {
      const cards = await getCardsByList(listId);
      setCardsByList((prev) => ({ ...prev, [listId]: cards }));
    } catch (error) {
      console.error("Failed to refresh cards:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const sourceListId = source.droppableId;
    const destListId = destination.droppableId;
    const cardId = draggableId;

    setCardsByList((prev) => {
      const sourceCards = [...prev[sourceListId]];
      const cardIndex = sourceCards.findIndex((c) => c._id === cardId);
      const [movedCard] = sourceCards.splice(cardIndex, 1);
      const destCards = [...prev[destListId]];
      movedCard.listId = destListId;
      destCards.splice(destination.index, 0, movedCard);
      return { ...prev, [sourceListId]: sourceCards, [destListId]: destCards };
    });

    try {
      await moveCard(cardId, destListId);
    } catch (error) {
      console.error("Failed to move card:", error);
      fetchListsAndCards();
    }
  };

  return (
    <div style={{ padding: "24px", background: "var(--bg-page)", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
    <div>
  <h1 className="page-title" style={{ margin: "0 0 16px 0" }}>{board?.name || "Board Details"}</h1>
  {board?.description && (
    <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 0 10px 0", lineHeight: "1.6" }}>{board.description}</p>
  )}
  <p style={{ color: "#a5adba", fontSize: "12px", margin: "0 0 8px 0" }}>Board ID: {id}</p>
</div>
        <button className="btn btn-secondary" onClick={() => setShowSettings(!showSettings)}>
          ⚙️ {showSettings ? "Close Settings" : "Board Settings"}
        </button>
      </div>

      {showSettings && (
        <div className="panel" style={{ marginTop: "12px", marginBottom: "16px", maxWidth: "400px" }}>
          <h3>Board Settings</h3>
          <label style={{ fontSize: "13px", fontWeight: "bold", color: "var(--text-dark)" }}>Board Name</label>
          <input
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", marginTop: "4px", boxSizing: "border-box" }}
          />
          <label style={{ fontSize: "13px", fontWeight: "bold", color: "var(--text-dark)" }}>Description</label>
          <textarea
            value={boardDescription}
            onChange={(e) => setBoardDescription(e.target.value)}
            placeholder="What is this board for?"
            style={{ width: "100%", marginBottom: "10px", marginTop: "4px", minHeight: "70px", boxSizing: "border-box" }}
          />
          <button className="btn" onClick={handleSaveSettings}>Save Settings</button>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", marginTop: "20px", overflowX: "auto", paddingBottom: "10px" }}>
          {lists.map((list) => (
            <Droppable droppableId={list._id} key={list._id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <ListColumn
                    list={list}
                    cards={cardsByList[list._id] || []}
                    onUpdate={handleUpdateList}
                    onDelete={handleDeleteList}
                    onCardsChange={() => refreshListCards(list._id)}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <div style={{ marginTop: "16px" }}>
        <input
          placeholder="Enter list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <button className="btn" onClick={handleAddList}>+ Add List</button>
      </div>
    </div>
  );
}

export default BoardDetails;