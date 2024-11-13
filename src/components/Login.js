import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  // State to manage user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null); // Store user's image (if any)
  const [age, setAge] = useState(null); // Store user's age
  const [profession, setProfession] = useState(''); // Store user's profession
  const navigate = useNavigate(); // To navigate after successful login

  // Handles login logic
  const handleLogin = () => {
    // Get users data from localStorage
    const userData = JSON.parse(localStorage.getItem('users')) || [];
    // Find a user that matches the email and password entered
    const user = userData.find(u => u.email === email && u.password === password);

    if (user) {
      // If user is found, store user data in localStorage (current user)
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Set user data (image, age, profession) for displaying after login
      setImage(user.image);
      setAge(user.age);
      setProfession(user.profession);
      // Redirect user to account page
      navigate('/account');
    } else {
      // Show an alert if the login credentials are incorrect
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {/* Email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Login button triggers login logic */}
      <button onClick={handleLogin}>Login</button>

      {/* Display user profile image (if available), age, and profession after successful login */}
      {image && <img src={image} alt="Profile Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
      {age && <p>Age: {age}</p>}
      {profession && <p>Profession: {profession}</p>}

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
