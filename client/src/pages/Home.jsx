import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
const Home = () => {

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const isAuthenticated = true;
  if (isAuthenticated) {
    navigate("/chat");
  }
  return (
    <div>
     Home
    </div>
  );
};

export default Home;
