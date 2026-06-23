import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "60px 30px", textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "42px", color: "var(--primary-dark)", marginBottom: "12px" }}>
        🟦 Trello Clone
      </h1>
      <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "32px", lineHeight: "1.6" }}>
        A full-stack Kanban board built with React, Node.js, Express, and MongoDB.
        Manage your tasks with drag-and-drop, member assignment, comments, and more.
      </p>

      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
        <Link to="/boards">
          <button className="btn" style={{ padding: "12px 28px", fontSize: "16px" }}>
            📋 View Boards
          </button>
        </Link>
        <Link to="/register">
          <button className="btn btn-secondary" style={{ padding: "12px 28px", fontSize: "16px" }}>
            ✍️ Register
          </button>
        </Link>
        <Link to="/login">
          <button className="btn btn-secondary" style={{ padding: "12px 28px", fontSize: "16px" }}>
            🔐 Login
          </button>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", textAlign: "left" }}>
        {[
          { icon: "📋", title: "List Management", desc: "Create, edit and delete lists" },
          { icon: "🃏", title: "Card CRUD", desc: "Full card management with priority and due dates" },
          { icon: "🖱️", title: "Drag & Drop", desc: "Move cards between lists seamlessly" },
          { icon: "👥", title: "Member Assignment", desc: "Assign team members to cards" },
          { icon: "💬", title: "Comments", desc: "Collaborate with comments and activity logs" },
          { icon: "⚙️", title: "Board Settings", desc: "Rename boards and manage descriptions" },
        ].map((feature) => (
          <div key={feature.title} className="panel" style={{ padding: "16px" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{feature.icon}</div>
            <strong style={{ color: "var(--text-dark)", fontSize: "14px" }}>{feature.title}</strong>
            <p style={{ color: "var(--text-muted)", fontSize: "12px", margin: "4px 0 0 0" }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}