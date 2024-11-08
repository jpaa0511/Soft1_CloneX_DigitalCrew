import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import MainPage from "../pages/home/MainPage";
import Register from "../pages/Record/record";
import Xprofile from "../pages/Profile/Profile";
import Follower from "../Components/FollowerAndFollowing/Followers";
import Following from "../Components/FollowerAndFollowing/Following";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Explore from "../pages/Explore/Explore";

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
        path="/profile/:userId"
        element={
          <PrivateRoute>
            <Xprofile />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile/:userId/followers"
        element={
          <PrivateRoute>
            <Follower />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile/:userId/following"
        element={
          <PrivateRoute>
            <Following />
          </PrivateRoute>
        }
      />

      <Route
        path="/explore"
        element={
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
