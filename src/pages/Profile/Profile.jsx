import React, { useEffect, useState, useContext } from "react";
import { Calendar } from "lucide-react";
import { Sidebar } from "../../Components/Sidebar";
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
  Stats,
  StatItem,
} from "./styles";
import User from "../../Components/Img/user1.png";
import { Container, SidebarContainer, WidgetsContainer } from "../Home/styles";
import { Tweet } from "../../Components/Tweet/Tweet";
import { ProfileModal } from "./ProfileModal";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Connecting_to_Firebase/firebase";

const XProfile = () => {
  const { userId } = useParams();
  const { user, errorMessage } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setUserData({
          displayName: user.displayName,
          photoURL: user.photoURL,
          userName: user.userName || "Usuario",
          following: user.following || 0,
          followers: user.followers || 0,
          bannerURL: user.bannerURL || "https://example.com/default-cover.jpg",
          joinDate: user.joinDate || "N/A",
        });
      } else {
        try {
          const userDoc = doc(db, "perfil", userId);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserData({
              displayName: userData.displayName,
              photoURL: userData.photoURL || User,
              userName: userData.userName,
              following: userData.following || 0,
              followers: userData.followers || 0,
              bannerURL:
                userData.bannerURL || "https://example.com/default-cover.jpg",
              joinDate: userData.joinDate || "N/A",
            });
          } else {
            console.error("User does not exist");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId, user]);

  const [isOpenModalProfile, setOpenModalProfile] = useState(false);
  const handleModalToggle = () => {
    setOpenModalProfile(!isOpenModalProfile);
  };

  if (!userData) {
    return <h1>Loading...</h1>;
  }

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
                src={userData.bannerURL}
                alt="Cover"
                className="cover-photo"
              />
              <img
                src={userData.photoURL}
                alt="Profile"
                className="profile-photo"
              />
            </div>
            {!userId ? (
              <ProfileButton onClick={handleModalToggle}>
                Edit profile
              </ProfileButton>
            ) : (
              <ProfileButton>Follow</ProfileButton>
            )}
            <ProfileModal
              isOpen={isOpenModalProfile}
              onClose={handleModalToggle}
              user={user}
              errorMessage={errorMessage}
            />
            <div className="profile-info">
              <h2 className="profile-name">
                {userData.displayName}
                <VerifiedBadge>Get verified</VerifiedBadge>
              </h2>
              <p className="userName">@{userData.userName}</p>

              <div className="join-date">
                <Calendar size={16} />
                <span>Joined {userData.joinDate}</span>
              </div>
              <Stats>
                <StatItem href={`/profile/${userId || user.uid}/following`}>
                  <span className="number">{userData.following}</span>
                  <span className="text">Following</span>
                </StatItem>
                <StatItem href={`/profile/${userId || user.uid}/followers`}>
                  <span className="number">{userData.followers}</span>
                  <span className="text">Followers</span>
                </StatItem>
              </Stats>
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