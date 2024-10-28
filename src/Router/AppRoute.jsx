import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import MainPage from "../pages/home/MainPage";
import Register from "../pages/Record/record";
import Profile from "../pages/Profile/Profile";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
