import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../api';

const TaskList = ({ onEdit, token }) => {
  const [tasks, setTasks] = useState([]); //stores all tasks fetched from backend.
  const [filter, setFilter] = useState('all'); //controls showing all/pending/completed tasks.

  const fetchTasks = () => {
    getTasks(token).then(res => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks(); //all tasks
    // eslint-disable-next-line
  }, [token]);

  const handleDelete = async (id) => { //delete and reload
    await deleteTask(id, token);
    fetchTasks();
  };

  const handleMarkDone = async (id) => { //mark as completed and reload
    await updateTask(id, { status: 'completed' }, token);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => //filter tasks based on status
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div>
      <h2>Tasks</h2>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <div>
        {filteredTasks.map(task => (
          <div className="task-item" key={task._id}>
            <div>
              <strong>{task.title}</strong> <span>({task.status})</span>
              <div style={{ fontSize: '0.9em', color: '#555' }}>{task.description}</div>
              {task.dueDate && (
                <div style={{ fontSize: '0.85em', color: '#888' }}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="task-actions">
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
              {task.status === 'pending' && (
                <button onClick={() => handleMarkDone(task._id)}>Mark as Done</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;