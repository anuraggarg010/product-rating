import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axiosInstance from '../api/axiosInstance';



function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axiosInstance.post('/register', {
          username: formData.username,
          password: formData.password,
        })
        .then( (response) => {
          console.log(response)
          if (response.statusText === "Created") {
            alert('Registration successful');
            window.location = '/login'
            setFormData({ username: '', password: '' });
          } else {
            console.error('Registration failed');
          }        })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        
        <button type="submit" className="submit-button">Register</button>
        <Link className="text" to = "/login">Login now </Link>
      </form>
    </div>
  );
}

export default Register;

// anuraggarg096
// utdyYL1VigitM8LJ