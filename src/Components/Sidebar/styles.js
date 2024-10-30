import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 275px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-right: 1px solid #2f3336;
  background-color: #000;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 10px;
  cursor: pointer;
  color: white; /* Color azul */
  
  .MuiSvgIcon-root {
    width: 30px;
    height: 30px;
    color: white; /* Asegura el color azul */
  }
  
  &:hover {
    background-color: #192734;
    transition: background-color 200ms ease-out;
  }
`;

export const SidebarIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 10px;
  cursor: pointer;
  color: #d9d9d9; /* Texto claro */

  > h2 {
    font-size: 19px;
    margin-left: 20px;
    font-weight: 400;
    color: #d9d9d9; /* Texto claro */
  }

  > .MuiSvgIcon-root {
    width: 30px;
    height: 30px;
    color: #1da1f2; /* Azul de Twitter/X */
  }

  &:hover {
    background-color: #192734; /* Fondo más claro al hacer hover */
    color: #1da1f2;
    transition: background-color 200ms ease-out, color 200ms ease-out;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px; /* Asegura espacio en la parte inferior */
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.2s ease-in;
  color: #d9d9d9; /* Texto claro */

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;

    h4 {
      font-size: 15px;
      margin-bottom: 2px;
      color: #d9d9d9;
    }

    span {
      font-size: 13px;
      color: #8899a6;
    }
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  background-color: #000;
  border: 1px solid #2f3336;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 120px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export const TooltipItem = styled.div`
  padding: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Button = styled.button`
  background-color: var(--twittercolor);
  border: none;
  color: white;
  font-weight: 700;
  padding: 7px 20px;
  height: 45px;
  border-radius: 9999px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #1a91da;
  }
`;