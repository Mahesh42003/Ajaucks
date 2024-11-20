import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../Services/index.js'
import { useNavigate } from 'react-router-dom';
import './index.css'

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   
  useEffect(() => {
    loadUsers();
  }, []);
 
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => navigate('/add')}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1]}</td>
              <td>{user.email}</td>
              <td>{user.department || 'N/A'}</td>
              <td>
                <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
