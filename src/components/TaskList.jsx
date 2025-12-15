import React from "react";
import TaskItem from "./TaskItem";
import { getUserById } from "../utils/storage";

const TaskList = ({
  tasks,
  onUpdateStatus,
  showAssignee = true,
  draggable = false,
}) => {
  if (tasks.length === 0) {
    return (
      <div
        className="empty-state"
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#666",
        }}
      >
        <p>No tasks found</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          isDraggable={draggable}
        />
      ))}
    </div>
  );
};

export default TaskList;
