import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: black;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: black;
  color: white;
  font-family: "Arial", sans-serif;
`;

export const SidebarLeft = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const MainContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 70px;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #e7e9ea;
`;

export const LoginButton = styled.button`
  width: 300px;
  padding: 0.75rem 1rem;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a91da;
  }
`;

export const UserData = styled.div`
  background-color: #192734;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 2rem;
  width: 300px;
  font-size: 14px;
  line-height: 1.5;
  color: #e7e9ea;
`;

export const Pre = styled.pre`
  white-space: pre-wrap;
  word-break: break-word;
`;

export const Form = styled.div`
  margin-top: 2rem;
`;
export const Input = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 16px;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #1da1f2;
    }
  }
`;

export const RegisterButton = styled.button`
  width: 300px;
  padding: 0.75rem 1rem;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a91da;
  }
`;

export const CloseIconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`;

export const InputRegister = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 16px;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #1da1f2;
    }
  }
`;

export const HeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TitleRegister = styled.h1`
  font-size: 31px;
  font-weight: 700;
  color: #e7e9ea;
`;

export const GoogleButton = styled.button`
  width: 300px;
  padding: 0.75rem 1rem;
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: lightgrey;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 30px;
  }
`;

export const FacebookButton = styled.button`
  width: 300px;
  padding: 0.75rem 1rem;
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: lightgrey;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 30px;
  }
`;
