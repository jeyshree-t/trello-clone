import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>

      <input type="email" placeholder="Email" />
      <br /><br />

      <input type="password" placeholder="Password" />
      <br /><br />

      <button>Login</button>

      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <p>
        <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
}