import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = () => {
    loginWithRedirect();
  };

  // Redirect to chat route if user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat"); // Use navigate instead of history.push
    }
  }, [isAuthenticated, navigate]); // Add navigate to dependency array

  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Home;
