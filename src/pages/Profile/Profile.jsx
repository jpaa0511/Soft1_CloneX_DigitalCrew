import React, { useEffect, useState, useContext } from "react";
import { Calendar } from "lucide-react";
import { Sidebar } from "../../Components/Sidebar/index";
import { Widgets } from "../../Components/Widgets";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyles from "../../styles/StylesGlobal";
import { UserContext } from "../../auth/Contexts/UserContext";
import {
  AppContainer,
  ProfileButton,
  TabsContainer,
  ProfileHeaderContainer,
  VerifiedBadge,
  HeaderModal,
  CloseButton,
  TitleRegister,
  Form,
  Input,
  Avatar,
  File,
} from "./styles";
import User from "../../Components/Img/user1.png";
import { Container, SidebarContainer, WidgetsContainer } from "../Home/styles";
import { Tweet } from "../../Components/Tweet/Tweet";
import { ProfileModal } from "../../Components/Modal/ModalProfile";

const Xprofile = () => {
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
  const openModalProfile = () => {
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
            <ProfileButton onClick={openModalProfile}>
              Edit profile
            </ProfileButton>
            {isOpenModalProfile && (
              <ProfileModal>
                <HeaderModal>
                  <TitleRegister>Edit Profile</TitleRegister>
                  <CloseButton onClick={openModalProfile}>X</CloseButton>
                </HeaderModal>
                <form>
                  <Form>
                    <Avatar src={user?.photoURL} alt="" />
                    <File
                      type="file"
                      className="primary"
                      // onChange={handleAvatarChange}
                      accept="image/*"
                    />
                    <Input>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        // value={email}
                        // onChange={onInputChangeLogin}
                        placeholder="Enter your Name"
                        required
                      />
                    </Input>
                    <Input>
                      <label htmlFor="userName">User Name</label>
                      <input
                        type="text"
                        name="userName"
                        // value={password}
                        // onChange={onInputChangeLogin}
                        placeholder="Enter your user name"
                        required
                      />
                    </Input>
                    <Input>
                      <label htmlFor="bio">Bio</label>
                      <input
                        type="text"
                        name="bio"
                        // value={password}
                        // onChange={onInputChangeLogin}
                        placeholder="Enter your bio"
                        required
                      />
                    </Input>
                    {/* <LoginButton type="submit">Login</LoginButton> */}
                  </Form>
                  {errorMessage && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                      {errorMessage}
                    </p>
                  )}
                </form>
              </ProfileModal>
            )}
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

export default Xprofile;
