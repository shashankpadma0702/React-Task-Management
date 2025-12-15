import React from "react";
import { useDrag } from "react-dnd";
import { getUserById } from "../utils/storage";

const TaskItem = ({ task, onUpdateStatus, isDraggable = false }) => {
  const assignee = getUserById(task.assigneeId);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: { id: task.id },
      canDrag: isDraggable,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task.id, isDraggable]
  );

  const handleStatusUpdate = () => {
    if (onUpdateStatus) {
      const newStatus = task.status === "Completed" ? "Pending" : "Completed";
      onUpdateStatus(task.id, newStatus);
    }
  };

  const itemStyle = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? "move" : "default",
  };

  return (
    <div
      ref={isDraggable ? drag : null}
      className={`task-item ${isDragging ? "dragging" : ""}`}
      style={itemStyle}
    >
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span className={`task-status status-${task.status.toLowerCase()}`}>
            {task.status}
          </span>
          {assignee && (
            <span className="task-assignee">
              Assigned to: {assignee.username}
            </span>
          )}
          {task.createdAt && (
            <span
              className="task-date"
              style={{ color: "#999", fontSize: "12px" }}
            >
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {onUpdateStatus && (
        <button
          onClick={handleStatusUpdate}
          className={`btn ${
            task.status === "Completed" ? "btn-danger" : "btn-success"
          }`}
          style={{ padding: "8px 16px", fontSize: "14px" }}
        >
          {task.status === "Completed"
            ? "Mark as Pending"
            : "Mark as Completed"}
        </button>
      )}
    </div>
  );
};

export default TaskItem;
