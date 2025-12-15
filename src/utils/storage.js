import { v4 as uuidv4 } from "uuid";

// Initialize localStorage with default data
export const initializeStorage = () => {
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      { id: "1", username: "admin", password: "admin123", role: "admin" },
      { id: "2", username: "john", password: "john123", role: "user" },
      { id: "3", username: "jane", password: "jane123", role: "user" },
      { id: "4", username: "mike", password: "mike123", role: "user" },
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem("tasks")) {
    const defaultTasks = [
      {
        id: uuidv4(),
        title: "Design Homepage",
        description: "Create wireframes for homepage",
        assigneeId: "2",
        status: "Pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: "Fix Login Bug",
        description: "Resolve authentication issue",
        assigneeId: "3",
        status: "Pending",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  }
};

// User operations
export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getUserById = (id) => {
  const users = getUsers();
  return users.find((user) => user.id === id);
};

export const authenticateUser = (username, password) => {
  const users = getUsers();
  return users.find(
    (user) => user.username === username && user.password === password
  );
};

// Task operations
export const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const createTask = (taskData) => {
  const tasks = getTasks();
  const newTask = {
    id: uuidv4(),
    ...taskData,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTaskStatus = (taskId, status) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, status } : task
  );
  saveTasks(updatedTasks);
};

export const reassignTask = (taskId, newAssigneeId) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, assigneeId: newAssigneeId } : task
  );
  saveTasks(updatedTasks);
};

export const getTasksByUser = (userId) => {
  const tasks = getTasks();
  return tasks.filter((task) => task.assigneeId === userId);
};

export const getAllTasks = () => {
  return getTasks();
};
