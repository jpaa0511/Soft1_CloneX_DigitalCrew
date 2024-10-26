import React, { useContext, useState } from "react";
import {
  Container,
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
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconsOptions } from "./IconsOptions";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../auth/Contexts/UserContext";

export const Sidebar = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { user, logOutUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logOutUser();
    navigate("/login", { replace: true });
  };

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  return (
    <Container>
      <XIcon className="LogoTitter" />
      <IconsOptions Icon={HomeIcon} text="Estoy aca" to='/main'/>
      <IconsOptions Icon={SearchIcon} text="Explore" />
      <IconsOptions Icon={NotificationsActiveIcon} text="Notifications" />
      <IconsOptions Icon={EmailIcon} text="Messages" />
      <IconsOptions Icon={BookmarksIcon} text="Bookmarks" />
      <IconsOptions Icon={PeopleIcon} text="Communities" />
      <IconsOptions Icon={PersonIcon} text="Profile" to='/profile'/>
      <IconsOptions Icon={MoreHorizIcon} text="More" />

      <Button>Post</Button>

      <UserContainer onClick={toggleTooltip}>
        <Avatar src={user?.photoURL} alt="User Avatar" />
        <div>
          <h4>{user?.displayName}</h4>
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
