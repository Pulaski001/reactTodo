import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, onUpdateTask, taskToEdit, clearEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Both fields are required.');
      return;
    }
    if (taskToEdit) {
      onUpdateTask({ ...taskToEdit, name, description });
    } else {
      onAddTask({ id: Date.now(), name, description, completed: false });
    }
    clearEdit();
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
