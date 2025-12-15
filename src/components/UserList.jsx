import React from "react";
import { useDrop } from "react-dnd";
import { getUserById, getTasksByUser } from "../utils/storage";

const UserCard = ({ user, onDrop, isOver }) => {
  const userTasks = getTasksByUser(user.id);

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item) => onDrop(item.id, user.id),
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }),
    [user.id, onDrop]
  );

  return (
    <div
      ref={drop}
      className={`user-card ${isOver ? "drop-target" : ""}`}
      style={{
        background: "white",
        border: "2px solid #e1e1e1",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "15px",
        transition: "all 0.3s",
        borderColor: isOver ? "#667eea" : "#e1e1e1",
        backgroundColor: isOver ? "rgba(102, 126, 234, 0.1)" : "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ color: "#333", marginBottom: "5px" }}>
            {user.username}
          </h3>
          <p style={{ color: "#666", fontSize: "14px" }}>
            {user.role === "admin" ? "Administrator" : "Regular User"}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#667eea",
            }}
          >
            {userTasks.length}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>tasks</div>
        </div>
      </div>

      {userTasks.length > 0 && (
        <div
          style={{
            marginTop: "15px",
            borderTop: "1px solid #e1e1e1",
            paddingTop: "15px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
            Assigned Tasks:
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {userTasks.slice(0, 3).map((task) => (
              <li
                key={task.id}
                style={{
                  fontSize: "12px",
                  color: "#555",
                  padding: "5px 0",
                  borderBottom: "1px solid #f1f1f1",
                }}
              >
                {task.title}
              </li>
            ))}
            {userTasks.length > 3 && (
              <li style={{ fontSize: "11px", color: "#999", padding: "5px 0" }}>
                + {userTasks.length - 3} more tasks
              </li>
            )}
          </ul>
        </div>
      )}

      <div
        style={{
          fontSize: "11px",
          color: "#999",
          marginTop: "10px",
          fontStyle: "italic",
        }}
      >
        Drop tasks here to reassign
      </div>
    </div>
  );
};

const UserList = ({ onTaskReassigned }) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const handleDrop = (taskId, newAssigneeId) => {
    if (onTaskReassigned) {
      onTaskReassigned(taskId, newAssigneeId);
    }
  };

  return (
    <div className="dashboard-card">
      <h2>Users</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Drag and drop tasks onto users to reassign them
      </p>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDrop={handleDrop} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
