import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  // State to manage user input for email, password, age, and profession
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const navigate = useNavigate(); // To navigate programmatically after successful registration

  // Handles registration of a new user
  const handleRegister = () => {
    // Get existing users from localStorage, or initialize with an empty array if none exist
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Create a new user object with email, password, age, and profession
    const newUser = { email, password, age, profession, image: null };
    // Add new user to the users array
    users.push(newUser);
    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    // Redirect user to the login page after successful registration
    navigate('/login');
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {/* Email input */}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      {/* Password input */}
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      {/* Age input */}
      <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      {/* Profession input */}
      <input type="text" placeholder="Profession" onChange={(e) => setProfession(e.target.value)} />
      {/* Register button triggers registration logic */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
