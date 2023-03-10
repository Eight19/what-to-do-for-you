import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  if (Auth.loggedIn()) {
    return (
      <>
        <Link to="/me">
          {Auth.getProfile().data.username}'s TODO list
        </Link>
        &nbsp;
        <button onClick={logout}>
          Logout
        </button>
      </>
    );
  }
  // If logged out show login controls
  return (
    <>
      <Link to="/login">
        Login
      </Link>
      &nbsp;
      <Link to="/signup">
        Signup
      </Link>
    </>
  )
}

export default Navbar
