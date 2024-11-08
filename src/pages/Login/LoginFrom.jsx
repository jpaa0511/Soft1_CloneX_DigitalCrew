import React from "react";
import { Form, Input, LoginButton, CloseIconContainer } from "./LoginStyle";
import CloseIcon from "@mui/icons-material/Close";

const LoginForm = ({
  email,
  password,
  onInputChange,
  onLogin,
  errorMessage,
  toggleModalLogin,
}) => (
  <form onSubmit={onLogin}>
    <Form>
      <CloseIconContainer onClick={toggleModalLogin}>
        <CloseIcon />
      </CloseIconContainer>
      <Input>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onInputChange}
          placeholder="Enter your email"
          required
        />
      </Input>
      <Input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
          placeholder="Enter your password"
          required
        />
      </Input>
      <LoginButton type="submit">Login</LoginButton>
    </Form>
    {errorMessage && (
      <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
    )}
  </form>
);

export default LoginForm;
