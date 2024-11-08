import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  LogoContainer,
  UserContainer,
  Avatar,
  TooltipContainer,
  TooltipItem,
  Button,
} from "./styles";
import XIcon from "@mui/icons-material/X";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconsOptions } from "./IconsOptions";
import { UserContext } from "../../auth/Contexts/UserContext";
import { db } from "../../Connecting_to_Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { user, logOutUser } = useContext(UserContext);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/login", { replace: true });
  };

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "perfil", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.displayName);
            setAvatar(userData.photoURL);
            setProfileExists(true);
          } else {
            setUserName(user.displayName || "Usuario");
            setAvatar(user.photoURL || "default-avatar-url");
            setProfileExists(false);
          }
        } catch (error) {
          console.error("Error getting profile data:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const profilePath = `/profile/${user?.uid}`;

  return (
    <Container>
      <LogoContainer>
        <XIcon />
      </LogoContainer>
      <IconsOptions Icon={HomeIcon} text="Home" to="/main" />
      <IconsOptions Icon={SearchIcon} text="Explore" to="/explore" />
      <IconsOptions Icon={NotificationsActiveIcon} text="Notifications" />
      <IconsOptions Icon={EmailIcon} text="Messages" />
      <IconsOptions Icon={PeopleIcon} text="Communities" />
      <IconsOptions Icon={PersonIcon} text="Profile" to={profilePath} />
      <IconsOptions Icon={MoreHorizIcon} text="More" />

      <Button>Post</Button>

      <UserContainer onClick={toggleTooltip}>
        <Avatar src={avatar} alt="User Avatar" />
        <div>
          <h4>{userName}</h4>
          <span>{user?.email}</span>
        </div>
        {showTooltip && (
          <TooltipContainer>
            <TooltipItem onClick={handleLogout}>Logout</TooltipItem>
          </TooltipContainer>
        )}
      </UserContainer>
    </Container>
  );
};
