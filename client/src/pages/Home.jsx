import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const Home = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = () => {
    loginWithRedirect();
  };
  if (isAuthenticated) {
    navigate("/chat");
  }
  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Home;
