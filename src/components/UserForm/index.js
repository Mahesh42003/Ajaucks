import React, { useState, useEffect } from 'react';
import { addUser, editUser, fetchUsers } from '../Services/index.js';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', department: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      const users = await fetchUsers();
      const userToEdit = users.find((u) => u.id === parseInt(id));
      setUser(userToEdit);
    } catch (err) {
      setError('Error fetching user details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editUser(id, user);
      } else {
        await addUser(user);
      }
      navigate('/');
    } catch (err) {
      setError('Error saving user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit User' : 'Add User'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Name:
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </label>
      <label>
        Department:
        <input
          type="text"
          value={user.department}
          onChange={(e) => setUser({ ...user, department: e.target.value })}
        />
      </label>
      <button type="submit">{id ? 'Save Changes' : 'Add User'}</button>
    </form>
  ); 
};

export default UserForm;
