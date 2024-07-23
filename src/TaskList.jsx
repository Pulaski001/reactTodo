import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setTaskToEdit(null);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    setTaskToEdit(task);
  };

  return (
    <div className="task-list">
      <TaskForm
        onAddTask={addTask}
        onUpdateTask={updateTask}
        taskToEdit={taskToEdit}
        clearEdit={() => setTaskToEdit(null)}
      />
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
