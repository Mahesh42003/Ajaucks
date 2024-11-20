import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';



// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};


export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    console.log(response.data)
    return response.data;
  } 
  catch (error) {
    throw new Error('Error adding user');
  }
};

// Edit an existing user
export const editUser = async (id, updatedUser) => {
  try {
    return await axios.put(`${API_URL}/${id}`, JSON.stringify(updatedUser));
    
  } catch (error) {
    throw new Error('Error editing user');
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`); 
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
