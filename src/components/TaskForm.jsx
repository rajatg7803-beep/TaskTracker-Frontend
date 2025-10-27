import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from '../api';

const TaskForm = ({ editingTask, onSuccess, token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending'
  });

  useEffect(() => {
    if (editingTask) setForm(editingTask);
    else setForm({ title: '', description: '', dueDate: '', status: 'pending' });
  }, [editingTask]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingTask) {
      await updateTask(editingTask._id, form, token);
    } else {
      await addTask(form, token);
    }
    setForm({ title: '', description: '', dueDate: '', status: 'pending' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="dueDate"
        type="date"
        value={form.dueDate?.slice(0,10) || ''}
        onChange={handleChange}
      />
      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;