import React from "react";
import "./tasklist.css";
const TaskList = ({ tasks, deleteTask, toggleTaskStatus, setEditing }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            onClick={() => setEditing(task)}
          >
            {task.title}
          </span>
          <button class="list" onClick={() => toggleTaskStatus(task.id)}>
            {task.completed ? "✔️" : "❌"}
          </button>
          <button onClick={() => setEditing(task)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
