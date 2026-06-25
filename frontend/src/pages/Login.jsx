import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://trello-clone-backend-es3w.onrender.com/api/auth/login",
        { email, password }
      );
      // save token and user to localStorage for future use
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/boards");
    } catch (err) {
      setError("❌ " + (err.response?.data?.message || "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "60px 30px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 className="page-title">Welcome Back!</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
        Login to your Trello Clone account
      </p>

      <div className="panel">
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
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "16px", marginTop: "4px", boxSizing: "border-box" }}
        />

        <button
          className="btn"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", padding: "10px", fontSize: "14px" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "var(--danger)", marginTop: "12px", fontSize: "13px" }}>{error}</p>}

        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "var(--text-muted)" }}>
          <Link to="/forgot-password" style={{ color: "var(--primary)" }}>
            Forgot Password?
          </Link>
        </div>

        <p style={{ textAlign: "center", marginTop: "12px", fontSize: "13px", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary)" }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}