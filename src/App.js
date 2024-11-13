// src/App.js
import React from 'react'; // Import React to build the app
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components for routing
import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Register component
import Account from './components/Account'; // Import the Account component
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    // Wrap the entire app in the Router component to enable routing functionality
    <Router>
      <div className="App"> {/* Main container of the app */}

         {/* Define the routing logic with the Routes component */}
         <Routes>
          {/* Define the route for the Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Define the route for the Register page */}
          <Route path="/register" element={<Register />} />
          
          {/* Define the route for the Account page */}
          <Route path="/account" element={<Account />} />
          
          {/* Default route (redirects to login if no path matches) */}
          <Route path="/" element={<Login />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
