import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function LogInButton() {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    // Simular login
    login();
  };

  return (
    <div>

      <button className="btn btn-accent" onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default LogInButton