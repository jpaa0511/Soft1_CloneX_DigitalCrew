import styled from "styled-components";

export const StyledTab = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  background: ${({ active }) => (active ? "#1c1c1c" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#aaa")};
  border-radius: 5px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;