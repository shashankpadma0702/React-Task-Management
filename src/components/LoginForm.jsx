import React, { useState } from "react";
import { authenticateUser } from "../utils/storage";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const user = authenticateUser(username, password);

      if (user) {
        const { password, ...userWithoutPassword } = user;
        onLogin(userWithoutPassword);
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />
      </div>

      <button type="submit" className="btn btn-block" disabled={isLoading}>
        {isLoading ? (
          <>
            <div
              className="spinner"
              style={{ width: "20px", height: "20px", borderWidth: "2px" }}
            ></div>
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      <div className="demo-credentials">
        <p>
          <strong>Demo Credentials</strong>
        </p>
        <p>
          👑 <strong>Admin:</strong> admin / admin123
        </p>
        <p>
          👥 <strong>Users:</strong>
        </p>
        <p>• john / john123</p>
        <p>• jane / jane123</p>
        <p>• mike / mike123</p>
      </div>
    </form>
  );
};

export default LoginForm;
