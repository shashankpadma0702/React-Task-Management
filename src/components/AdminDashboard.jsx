import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import UserList from "./UserList";
import { getAllTasks, reassignTask, updateTaskStatus } from "../utils/storage";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const allTasks = getAllTasks();
    setTasks(allTasks);
  };

  const handleTaskCreated = (newTask) => {
    setMessage("✅ Task created successfully!");
    loadTasks();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleTaskReassigned = (taskId, newAssigneeId) => {
    reassignTask(taskId, newAssigneeId);
    setMessage("🔄 Task reassigned successfully!");
    loadTasks();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleTaskStatusUpdate = (taskId, status) => {
    updateTaskStatus(taskId, status);
    setMessage("✓ Task status updated!");
    loadTasks();
    setTimeout(() => setMessage(""), 3000);
  };

  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="admin-dashboard fade-in">
      {message && <div className="message">{message}</div>}

      <TaskForm onTaskCreated={handleTaskCreated} />

      <div className="dashboard-card">
        <h2>📊 Task Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{tasks.length}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#d97706" }}>
              {pendingCount}
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#059669" }}>
              {completedCount}
            </div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#ef476f" }}>
              {tasks.length - pendingCount - completedCount}
            </div>
            <div className="stat-label">Other Status</div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div>
          <div className="dashboard-card">
            <h2>📋 All Tasks ({tasks.length})</h2>
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks created yet</p>
                <small>Create your first task above</small>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onUpdateStatus={handleTaskStatusUpdate}
                draggable={true}
              />
            )}
          </div>
        </div>

        <div>
          <UserList onTaskReassigned={handleTaskReassigned} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
