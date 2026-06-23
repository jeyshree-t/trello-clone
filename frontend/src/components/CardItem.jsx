import { useState, useEffect } from "react";
import { getAllUsers } from "../services/userService";
import { assignMember, removeMember } from "../services/cardService";
import { getCommentsByCard, createComment } from "../services/commentService";
import { getActivityByCard } from "../services/activityService";

function CardItem({ card, onUpdate, onDelete, onCardsChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(
    card.dueDate ? card.dueDate.slice(0, 10) : ""
  );
  const [priority, setPriority] = useState(card.priority || "Medium");

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentingAs, setCommentingAs] = useState("");

  const priorityColors = {
    Low: "#61bd4f",
    Medium: "#ff9800",
    High: "#eb5a46",
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (showComments) {
      fetchComments();
      fetchActivities();
    }
  }, [showComments]);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await getCommentsByCard(card._id);
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const fetchActivities = async () => {
    try {
      const data = await getActivityByCard(card._id);
      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  const handleSave = () => {
    if (title.trim() === "") return;
    onUpdate(card._id, title, description, dueDate, priority);
    setIsEditing(false);
  };

  const handleAssign = async () => {
    if (!selectedUserId) return;
    try {
      await assignMember(card._id, selectedUserId);
      setSelectedUserId("");
      onCardsChange();
    } catch (error) {
      console.error("Failed to assign member:", error);
    }
  };

  const handleRemove = async (userId) => {
    try {
      await removeMember(card._id, userId);
      onCardsChange();
    } catch (error) {
      console.error("Failed to remove member:", error);
    }
  };

  const handleAddComment = async () => {
    if (newCommentText.trim() === "" || !commentingAs) return;
    try {
      await createComment(newCommentText, card._id, commentingAs);
      setNewCommentText("");
      fetchComments();
      fetchActivities();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const assignedIds = (card.members || []).map((m) => m._id);
  const availableUsers = allUsers.filter((u) => !assignedIds.includes(u._id));

  if (isEditing) {
    return (
      <div className="card-item">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ width: "100%", marginBottom: "6px", boxSizing: "border-box" }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div>
          <button className="btn" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: "6px" }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-item">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <strong style={{ color: "var(--text-dark)" }}>{card.title}</strong>
        <span
          style={{
            background: priorityColors[card.priority] || "#999",
            color: "#fff",
            fontSize: "11px",
            fontWeight: "600",
            padding: "2px 8px",
            borderRadius: "10px",
          }}
        >
          {card.priority}
        </span>
      </div>
      {card.description && <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>{card.description}</p>}
      {card.dueDate && (
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          📅 Due: {new Date(card.dueDate).toLocaleDateString()}
        </p>
      )}

      {/* MEMBERS SECTION */}
      <div style={{ marginTop: "6px" }}>
        {(card.members || []).map((member) => (
          <span
            key={member._id}
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--primary-light)",
              color: "var(--primary-dark)",
              borderRadius: "12px",
              padding: "2px 8px",
              fontSize: "12px",
              fontWeight: "600",
              marginRight: "4px",
              marginBottom: "4px",
            }}
            title={member.email}
          >
            {member.name}
            <button
              onClick={() => handleRemove(member._id)}
              style={{
                marginLeft: "4px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontWeight: "bold",
                color: "var(--primary-dark)",
              }}
            >
              ×
            </button>
          </span>
        ))}

        <div style={{ marginTop: "4px", display: "flex", gap: "4px" }}>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ flex: 1, fontSize: "12px" }}
          >
            <option value="">+ Assign member</option>
            {availableUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button className="btn" onClick={handleAssign} style={{ fontSize: "12px", padding: "4px 10px" }}>
            Add
          </button>
        </div>
      </div>

      <div style={{ marginTop: "6px" }}>
        <button className="btn btn-secondary" onClick={() => setIsEditing(true)} style={{ fontSize: "11px", padding: "4px 8px" }}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(card._id)} style={{ fontSize: "11px", padding: "4px 8px", marginLeft: "4px" }}>Delete</button>
      </div>

      {/* COMMENTS + ACTIVITY TOGGLE */}
      <div style={{ marginTop: "8px", borderTop: "1px solid var(--border-light)", paddingTop: "6px" }}>
        <button
          onClick={() => setShowComments(!showComments)}
          style={{ fontSize: "12px", background: "transparent", border: "none", color: "var(--primary)", cursor: "pointer", padding: 0, fontWeight: "600" }}
        >
          💬 {showComments ? "Hide" : "Show"} Comments & Activity
        </button>

        {showComments && (
          <div style={{ marginTop: "8px" }}>
            {/* ADD COMMENT */}
            <div style={{ marginBottom: "8px" }}>
              <select
                value={commentingAs}
                onChange={(e) => setCommentingAs(e.target.value)}
                style={{ width: "100%", fontSize: "12px", marginBottom: "4px", boxSizing: "border-box" }}
              >
                <option value="">Commenting as...</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Write a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                style={{ width: "100%", fontSize: "12px", marginBottom: "4px", boxSizing: "border-box" }}
              />
              <button className="btn" onClick={handleAddComment} style={{ fontSize: "12px", padding: "4px 10px" }}>
                Post Comment
              </button>
            </div>

            {/* COMMENT LIST */}
            <div style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "12px", color: "var(--text-dark)" }}>Comments</strong>
              {comments.length === 0 && (
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>No comments yet.</p>
              )}
              {comments.map((comment) => (
                <div key={comment._id} style={{ fontSize: "12px", background: "var(--primary-light)", borderRadius: "6px", padding: "6px 8px", marginTop: "4px" }}>
                  <strong style={{ color: "var(--primary-dark)" }}>{comment.author?.name || "Unknown"}</strong>
                  <span style={{ color: "var(--text-muted)", marginLeft: "6px", fontSize: "11px" }}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                  <p style={{ margin: "4px 0 0 0", color: "var(--text-dark)" }}>{comment.text}</p>
                </div>
              ))}
            </div>

            {/* ACTIVITY LOG */}
            <div>
              <strong style={{ fontSize: "12px", color: "var(--text-dark)" }}>Activity Log</strong>
              {activities.length === 0 && (
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>No activity yet.</p>
              )}
              {activities.map((activity) => (
                <p key={activity._id} style={{ fontSize: "11px", color: "var(--text-muted)", margin: "4px 0" }}>
                  <strong style={{ color: "var(--text-dark)" }}>{activity.user?.name || "Unknown"}</strong> {activity.action} —{" "}
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardItem;