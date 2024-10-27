import React from "react";
import {
  GlobalStyle,
  Container,
  SidebarLeft,
  MainContent,
  Title,
  GoogleButton,
  FacebookButton,
  RegisterButton,
} from "./LoginStyle";
import XIcon from "@mui/icons-material/X";
import LoginForm from "./LoginFrom";
import RegisterForm from "./Register";
import { useLogin } from "../../auth/hooks/useLogin";
import { LoginModal } from "../../Components/Modal/ModalLogin";
import { RegisterModal } from "../../Components/Modal/RegisterModal";

const Login = () => {
  const {
    displayName,
    email,
    password,
    onInputChange,
    onLogin,
    onRegister,
    isOpenModalRegister,
    toggleModalRegister,
    isOpenModalLogin,
    toggleModalLogin,
    onLoginWithGoogle,
    onLoginWithFacebook,
    errorMessage,
  } = useLogin();

  return (
    <>
      <GlobalStyle />
      <Container>
        <SidebarLeft>
          <XIcon style={{ fontSize: "400px", color: "#e7e9ea" }} />
        </SidebarLeft>
        <MainContent>
          <Title>Lo que está pasando ahora</Title>
          <h3>Únete hoy</h3>
          <br />
          <GoogleButton onClick={onLoginWithGoogle}>
            <img
              src="https://img.icons8.com/?size=512&id=17949&format=png"
              alt="Google icon"
            />{" "}
            Ingresar con Google
          </GoogleButton>
          <br />
          <FacebookButton onClick={onLoginWithFacebook}>
            <img
              src="https://images.vexels.com/content/223136/preview/facebook-icon-social-media-8dfafe.png"
              alt="Facebook icon"
            />
            Ingresar con Facebook
          </FacebookButton>
          <br />
          <p>______________ o _________________</p>
          <br />
          <RegisterButton onClick={toggleModalLogin}>Login</RegisterButton>
          <br />
          <RegisterButton onClick={toggleModalRegister}>
            CREAR CUENTA
          </RegisterButton>
        </MainContent>
        {isOpenModalLogin && (
          <LoginModal>
            <LoginForm
              email={email}
              password={password}
              onInputChange={onInputChange}
              onLogin={onLogin}
              errorMessage={errorMessage}
            />
          </LoginModal>
        )}
        {isOpenModalRegister && (
          <RegisterModal>
            <RegisterForm
              displayName={displayName}
              email={email}
              password={password}
              onInputChange={onInputChange}
              onRegister={onRegister}
              toggleModalRegister={toggleModalRegister}
            />
          </RegisterModal>
        )}
      </Container>
    </>
  );
};

export default Login;
