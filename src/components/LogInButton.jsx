import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StyledButton from "./styled/StyledButton";

function LogInButton() {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    // Simular login
    login();
  };

  return (
    <div>

      <StyledButton onClick={handleLogin}>Log In</StyledButton>
    </div>
  )
}

export default LogInButton