import React, { useState, useEffect } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  // State to manage user data (email, password, age, profession, image)
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const navigate = useNavigate(); // To navigate programmatically after updating account

  // UseEffect hook to get current user data from localStorage when component mounts
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // If current user data exists in localStorage, populate state with it
      setUser(currentUser);
      setImage(currentUser.image);
      setAge(currentUser.age); // Set age from logged-in user
      setProfession(currentUser.profession); // Set profession from logged-in user
    } else {
      // Redirect to login page if no user data exists
      navigate('/login');
    }
  }, [navigate]);

  // Handles image change (uploading new profile image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the selected file as base64 and update the user's image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUser({ ...user, image: reader.result }); // Update user object with new image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handles account update logic
  const handleUpdate = () => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    // Update the user data (based on email)
    const updatedUsers = users.map(u => u.email === user.email ? user : u);
    // Save updated users list back to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // Update currentUser in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Notify user of the successful update
    alert('Account updated');
    // Redirect to login page after update
    navigate('/login');
  };

  return (
    <div className="account">
      <h2>Account Information</h2>
      {/* Email input (read-only) */}
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        readOnly
      />
      {/* Password input */}
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      {/* Age input */}
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      {/* Profession input */}
      <input
        type="text"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder="Profession"
      />
      {/* Image upload input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ margin: '10px 0' }}
      />
      {/* Display the selected profile image */}
      {image && <img src={image} alt="Profile Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
      {/* Button to update account */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Account;
