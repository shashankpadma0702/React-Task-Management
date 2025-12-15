import React, { useState } from "react";
import { createTask, getUsers } from "../utils/storage";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const users = getUsers().filter((user) => user.role === "user");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !assigneeId) {
      alert("Please fill in all required fields");
      return;
    }

    const newTask = createTask({
      title,
      description,
      assigneeId,
    });

    onTaskCreated(newTask);

    // Reset form
    setTitle("");
    setDescription("");
    setAssigneeId("");
  };

  return (
    <div className="dashboard-card">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignee">Assign To *</label>
          <select
            id="assignee"
            className="form-control"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
