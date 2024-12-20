import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../auth/Contexts/UserContext";

export const PublicRoute = ({ children }) => {
  const { logged } = useContext(UserContext);

  return !logged ? children : <Navigate to="/main" />;
};
