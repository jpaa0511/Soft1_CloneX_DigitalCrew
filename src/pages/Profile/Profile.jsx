import React, { useEffect, useState, useContext } from "react";
import { Calendar } from "lucide-react";
import { Sidebar } from "../../Components/Sidebar/index";
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import { UserContext } from "../../auth/Contexts/UserContext";
import {
  AppContainer,
  ProfileButton,
  TabsContainer,
  ProfileHeaderContainer,
  VerifiedBadge,
} from "./styles";
import User from "../../Components/Img/user1.png";
import { Container, SidebarContainer, WidgetsContainer } from "../Home/styles";
import { Tweet } from "../../Components/Tweet/Tweet";
import { ProfileModal } from "./ProfileModal";

const XProfile = () => {
  const { user, errorMessage } = useContext(UserContext);
  const [profile, setProfile] = useState({
    coverPhoto: "",
    profilePhoto: "",
    name: "",
    username: "JUAN_K_017",
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      setProfile({
        coverPhoto: "/path/to/cover.jpg",
        profilePhoto: "",
        name: "",
        username: "Profile Name",
        followers: 0,
        following: 0,
      });
    };

    fetchProfileData();
  }, []);

  const [isOpenModalProfile, setOpenModalProfile] = useState(false);
  const handleModalToggle = () => {
    setOpenModalProfile(!isOpenModalProfile);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Container>
          <ProfileHeaderContainer>
            <div className="cover-photo-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF9f8Y4lwQeOnLijmMajma9CtCkOEs7MgSA&s"
                alt="Cover"
                className="cover-photo"
              />
              <img
                src={user?.photoURL || User}
                alt="Profile"
                className="profile-photo"
              />
            </div>
            <ProfileButton onClick={handleModalToggle}>
              Edit profile
            </ProfileButton>

            {/* Modal Component */}
            <ProfileModal
              isOpen={isOpenModalProfile}
              onClose={handleModalToggle}
              user={user}
              errorMessage={errorMessage}
            />

            <div className="profile-info">
              <h2 className="profile-name">
                {user?.displayName}
                <VerifiedBadge>Get verified</VerifiedBadge>
              </h2>
              <p className="username">@{profile.username}</p>

              <div className="join-date">
                <Calendar size={16} />
                <span>Joined December 2022</span>
              </div>

              <div className="stats">
                <span>
                  <strong>{profile.following}</strong> Following
                </span>
                <span>
                  <strong>{profile.followers}</strong> Followers
                </span>
              </div>
            </div>
          </ProfileHeaderContainer>

          <TabsContainer>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Replies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Highlights
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Articles
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Media
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Likes
              </a>
            </li>
          </TabsContainer>

          <Tweet />
        </Container>
        <WidgetsContainer>
          <Widgets />
        </WidgetsContainer>
      </AppContainer>
    </>
  );
};

export default XProfile;
