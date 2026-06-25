import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMessage("");
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://trello-clone-backend-es3w.onrender.com/api/auth/register",
        { name, email, password }
      );
      setMessage("✅ Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("❌ " + (err.response?.data?.message || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "60px 30px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 className="page-title">Create Account</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
        Join Trello Clone and start managing your tasks
      </p>

      <div className="panel">
        <label style={{ fontSize: "13px", fontWeight: "bold" }}>Name</label>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "12px", marginTop: "4px", boxSizing: "border-box" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "bold" }}>Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "12px", marginTop: "4px", boxSizing: "border-box" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "bold" }}>Password</label>
        <input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "16px", marginTop: "4px", boxSizing: "border-box" }}
        />

        <button
          className="btn"
          onClick={handleRegister}
          disabled={loading}
          style={{ width: "100%", padding: "10px", fontSize: "14px" }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {message && <p style={{ color: "var(--success)", marginTop: "12px", fontSize: "13px" }}>{message}</p>}
        {error && <p style={{ color: "var(--danger)", marginTop: "12px", fontSize: "13px" }}>{error}</p>}

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary)" }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}