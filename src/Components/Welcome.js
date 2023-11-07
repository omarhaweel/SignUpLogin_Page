// welcome.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Welcome = () => {
  // This function parses the query parameters and returns them as an object.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let name = query.get('name'); // Retrieves the name from the URL query parameters.

  return (
    <div className="welcome-container">
      <h1>Welcome, {name}!</h1>
      {/* More content like welcome message or user information can go here */}
    </div>
  );
};

export default Welcome;
