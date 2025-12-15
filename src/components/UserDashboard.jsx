import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { getTasksByUser, updateTaskStatus } from "../utils/storage";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser.id) {
      const userTasks = getTasksByUser(currentUser.id);
      setTasks(userTasks);
    }
  };

  const handleTaskStatusUpdate = (taskId, status) => {
    updateTaskStatus(taskId, status);
    setMessage("✓ Task status updated!");
    loadTasks();
    setTimeout(() => setMessage(""), 3000);
  };

  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="user-dashboard fade-in">
      {message && <div className="message">{message}</div>}

      <div className="dashboard-card">
        <h2>Dashboard Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{tasks.length}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#d97706" }}>
              {pendingTasks.length}
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#059669" }}>
              {completedTasks.length}
            </div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#4361ee" }}>
              {tasks.length > 0
                ? `${Math.round((completedTasks.length / tasks.length) * 100)}%`
                : "0%"}
            </div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div>
          <div className="dashboard-card">
            <h2>📋 Pending Tasks ({pendingTasks.length})</h2>
            {pendingTasks.length === 0 ? (
              <div className="empty-state">
                <p>No pending tasks</p>
                <small>All tasks are completed!</small>
              </div>
            ) : (
              <TaskList
                tasks={pendingTasks}
                onUpdateStatus={handleTaskStatusUpdate}
              />
            )}
          </div>
        </div>

        <div>
          <div className="dashboard-card">
            <h2>✅ Completed Tasks ({completedTasks.length})</h2>
            {completedTasks.length === 0 ? (
              <div className="empty-state">
                <p>No completed tasks yet</p>
                <small>Complete some tasks to see them here</small>
              </div>
            ) : (
              <TaskList
                tasks={completedTasks}
                onUpdateStatus={handleTaskStatusUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
