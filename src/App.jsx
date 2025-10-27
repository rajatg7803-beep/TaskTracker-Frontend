//THIS IS THE MAIN APP COMPPONENT
//MANAGES LOGIN STATE, TOKKEN STORAGE AND RENDERS OTHER COMPONENTS
import React, { useState } from 'react';
import AuthForm from './components/AuthForm'; //login/register
import TaskList from './components/TaskList'; //shows tasks
import TaskForm from './components/TaskForm'; //add/edit task

function App() {
  //Stores JWT token. Checks localStorage so user stays logged in after refreshing the page.
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  //Stores the task that is currently being edited.
  const [editingTask, setEditingTask] = useState(null);
  //force TaskList to re-render after adding/updating/deleting a task.
  const [refresh, setRefresh] = useState(false);

  const handleAuth = (jwt) => {
    setToken(jwt);
    localStorage.setItem('token', jwt); //Saves token to state and localStorage.
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token'); //clears token from state and localStorage.
  };

  const handleEdit = (task) => setEditingTask(task); //Sets editingTask when user clicks Edit on a task.
  const handleSuccess = () => {
    setEditingTask(null);
    setRefresh(!refresh);
  };

  //If user is not logged in → show AuthForm only.
  if (!token) {
    return (
      <div className="container">
        <h1>TaskTrackr</h1>
        <AuthForm onAuth={handleAuth} />
      </div>
    );
  }

  //If user is logged in → show Dashboard.
  return (
    <div className="container">
      <h1>TaskTrackr Dashboard</h1>
      <button style={{ float: 'right', marginBottom: 10 }} onClick={handleLogout}>
        Logout
      </button>
      <TaskForm editingTask={editingTask} onSuccess={handleSuccess} token={token} />
      <TaskList key={refresh} onEdit={handleEdit} token={token} />
    </div>
  );
}

export default App;