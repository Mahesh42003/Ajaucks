import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </Router> 
  );
};
  
export default App;
