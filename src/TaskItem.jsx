import React from 'react';

const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        </button>
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
