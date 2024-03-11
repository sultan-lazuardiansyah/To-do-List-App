import "./App.css";

import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    setEditing(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "uncompleted":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const sortTasks = (tasksToSort) => {
    switch (sort) {
      case "date":
        return tasksToSort.sort((a, b) => a.date - b.date);
      case "priority":
        return tasksToSort.sort((a, b) => a.priority.localeCompare(b.priority));
      default:
        return tasksToSort;
    }
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <TaskForm addTask={addTask} editing={editing} editTask={editTask} />
      <div className="filter">
        <label>Filter by:</label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>

        <label>Sort by:</label>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="date">Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <TaskList
        tasks={sortTasks(filterTasks())}
        deleteTask={deleteTask}
        toggleTaskStatus={toggleTaskStatus}
        setEditing={setEditing}
      />
    </div>
  );
};

export default App;
