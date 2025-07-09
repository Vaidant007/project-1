import React, { useState } from "react";
import "./RegisterForm.css";

interface RegisterFormProps {
  onBackToLogin: () => void;
  defaultRole?: "investor" | "entrepreneur";
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onBackToLogin, defaultRole = "investor" }) => {
  const [role, setRole] = useState<"investor" | "entrepreneur">(defaultRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="register-container">
        <h2>Registration Successful!</h2>
        <p>You can now log in with your new account.</p>
        <button className="login-btn" onClick={onBackToLogin}>Back to Login</button>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-tabs">
        <button
          className={role === "investor" ? "active" : ""}
          onClick={() => setRole("investor")}
          type="button"
        >
          Investor
        </button>
        <button
          className={role === "entrepreneur" ? "active" : ""}
          onClick={() => setRole("entrepreneur")}
          type="button"
        >
          Entrepreneur
        </button>
      </div>
      <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={loading}
        />
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
        className="email-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
        {error && <div className="error">{error}</div>}
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <button type="button" className="back-btn" onClick={onBackToLogin} disabled={loading}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
