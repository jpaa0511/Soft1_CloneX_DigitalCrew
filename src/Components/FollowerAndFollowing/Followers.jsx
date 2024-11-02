import React, { useState, useEffect, useContext } from "react";
import {
  AppContainer,
  ProfileContainer,
  Header,
  Username,
  Handle,
  Tabs,
  Tab,
  Content,
  FollowerList,
  FollowerItem,
  FollowerInfo,
  FollowerName,
  FollowerHandle,
  FollowButton,
  BackButtonContainer,
} from "./styles";
import { Container, SidebarContainer, WidgetsContainer } from "../../pages/Home/styles";
import { Sidebar } from "../../Components/Sidebar";
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../auth/Contexts/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Connecting_to_Firebase/firebase";

function Follower() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("followers");

  const handleClick = () => {
    navigate(userId ? `/profile/${userId}` : "/profile");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId && userId !== user.uid) {
        const userDoc = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setProfileData(userSnapshot.data());
        }
      } else {
        setProfileData(user); // Usa datos de UserContext si es el perfil logueado
      }
    };
    fetchData();
  }, [userId, user]);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Container>
          <ProfileContainer>
            <Header>
              <BackButtonContainer onClick={handleClick}>
                <ArrowBackIcon fontSize="large" />
              </BackButtonContainer>
              <div>
                <Username>{profileData?.displayName}</Username>
                <Handle>@{profileData?.userName}</Handle>
              </div>
            </Header>
            <Tabs>
              <Tab
                active={activeTab === "followers"}
                onClick={() => {
                  setActiveTab("followers");
                  navigate(`/profile/${userId || user.uid}/followers`);
                }}
              >
                Followers
              </Tab>
              <Tab
                active={activeTab === "following"}
                onClick={() => {
                  setActiveTab("following");
                  navigate(`/profile/${userId || user.uid}/following`);
                }}
              >
                Following
              </Tab>
            </Tabs>
            <Content>
              <FollowerList>
                {/* Mapea los elementos de followers según profileData */}
                {profileData?.followers?.map((followerUser) => (
                  <FollowerItem key={followerUser.uid}>
                    <FollowerInfo>
                      <FollowerName>{followerUser.displayName}</FollowerName>
                      <FollowerHandle>@{followerUser.userName}</FollowerHandle>
                    </FollowerInfo>
                    <FollowButton>Following</FollowButton>
                  </FollowerItem>
                ))}
              </FollowerList>
            </Content>
          </ProfileContainer>
        </Container>
        <WidgetsContainer>
          <Widgets />
        </WidgetsContainer>
      </AppContainer>
    </>
  );
}

export default Follower;
