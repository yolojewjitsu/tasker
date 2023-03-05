import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';
import './styles.css';

const getLocalStorage = () => {
  let tasks = localStorage.getItem('myTasks');
  if (tasks) {
    return JSON.parse(localStorage.getItem('myTasks'));
  } else {
    return [];
  }
};


export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(getLocalStorage());
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newTask = {
      id: id,
      ...task
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => 
        task.id === id
        ? {
            ...task,
            reminder: !task.reminder
          }
        : task    
      )
    );
  };

  const showTaskForm = () => {
    setShowAddTask(!showAddTask);
  };

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <Header onAdd={showTaskForm} title='Task Tracker' showAdd={showAddTask} />
      {showAddTask && <AddTask addTask={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          toggleReminder={toggleReminder}
        />  
      ) : (
        'No more tasks'
      )}
    </div>
  );
}
