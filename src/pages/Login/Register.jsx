import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Form,
  InputRegister,
  RegisterButton,
  CloseIconContainer,
} from "./LoginStyle";

const RegisterForm = ({
  displayName,
  email,
  password,
  onInputChange,
  onRegister,
  errorMessage,
  toggleModalRegister,
}) => (
  <form onSubmit={onRegister}>
    <Form>
      <CloseIconContainer onClick={toggleModalRegister}>
        <CloseIcon />
      </CloseIconContainer>
      <InputRegister>
        <label htmlFor="displayName">Name</label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={onInputChange}
          placeholder="Enter your Name"
          required
        />
      </InputRegister>
      <InputRegister>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onInputChange}
          placeholder="Enter your email"
          required
        />
      </InputRegister>
      <InputRegister>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
          placeholder="Enter your password"
          required
        />
      </InputRegister>
      <RegisterButton type="submit">CREAR CUENTA</RegisterButton>
    </Form>
    {errorMessage && (
      <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
    )}
  </form>
);

export default RegisterForm;
