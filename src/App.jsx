import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import { initializeStorage } from "./utils/storage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize default data in localStorage
    initializeStorage();

    // Check if user is already logged in
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <AuthProvider value={{ user, setUser: handleLogin }}>
        <div className="app">
          {user ? (
            <div>
              <nav className="navbar">
                <div className="navbar-content">
                  <h2>Task Management System</h2>
                  <div className="user-info">
                    <span>
                      Welcome, {user.username} ({user.role})
                    </span>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </div>
              </nav>
              <main className="main-content">
                {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
              </main>
            </div>
          ) : (
            <div className="login-container">
              <div className="login-card">
                <h1>Task Management System</h1>
                <p>Please login to continue</p>
                <LoginForm onLogin={handleLogin} />
              </div>
            </div>
          )}
        </div>
      </AuthProvider>
    </DndProvider>
  );
}

export default App;
