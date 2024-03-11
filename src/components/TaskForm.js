import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editing, editTask }) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    if (editing !== null) {
      setTask(editing.title);
    } else {
      setTask("");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      return;
    }

    if (editing !== null) {
      editTask(editing.id, {
        id: editing.id,
        title: task,
        completed: editing.completed,
      });
    } else {
      addTask({ id: new Date().getTime(), title: task, completed: false });
    }

    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">
        {editing !== null ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
