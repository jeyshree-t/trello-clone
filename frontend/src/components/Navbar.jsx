import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navStyle = {
    background: "var(--primary)",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  };

  const logoStyle = {
    color: "#fff",
    fontWeight: "800",
    fontSize: "18px",
    textDecoration: "none",
    letterSpacing: "0.5px",
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#fff" : "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "700" : "500",
    fontSize: "14px",
    padding: "6px 12px",
    borderRadius: "4px",
    background: location.pathname === path ? "rgba(255,255,255,0.2)" : "transparent",
    transition: "background 0.15s",
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>🟦 Trello Clone</Link>
      <div style={{ display: "flex", gap: "8px" }}>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/boards" style={linkStyle("/boards")}>Boards</Link>
        <Link to="/profile" style={linkStyle("/profile")}>Profile</Link>
        <Link to="/login" style={linkStyle("/login")}>Login</Link>
        <Link to="/register" style={linkStyle("/register")}>Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;