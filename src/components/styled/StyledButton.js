import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #1e40af;
  color: white;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    background-color: #1e3a8a;
  }
`;

export default StyledButton;
