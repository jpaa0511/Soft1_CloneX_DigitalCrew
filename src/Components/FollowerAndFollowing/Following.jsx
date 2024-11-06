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
  FollowingList,
  FollowingItem,
  FollowingInfo,
  FollowingName,
  FollowingHandle,
  PaginationContainer,
  PaginationButton,
  BackButtonContainer,
  FollowButton,
  FollowingAvatar,
} from "./styles"; // Importa los estilos desde styles.js
import {
  Container,
  SidebarContainer,
  WidgetsContainer,
} from "../../pages/Home/styles";
import { Sidebar } from "../../Components/Sidebar";
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../auth/Contexts/UserContext";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../Connecting_to_Firebase/firebase";

function Following() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("following"); // Control de pestaña activa
  const pageSize = 10;

  const handleClick = () => {
    navigate(userId ? `/profile/${userId}` : "/profile");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userId) {
        const userDoc = doc(db, "perfil", userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const profile = userSnapshot.data();
          setProfileData({
            displayName: profile.displayName,
            userName: profile.userName,
          });

          const followingList = profile.following || [];
          const followingProfiles = await Promise.all(
            followingList.map(async (followingUserId) => {
              const followingUserDoc = doc(db, "perfil", followingUserId);
              const followingUserSnapshot = await getDoc(followingUserDoc);
              if (followingUserSnapshot.exists()) {
                const followingUserData = followingUserSnapshot.data();
                return {
                  uid: followingUserId,
                  displayName: followingUserData.displayName,
                  userName: followingUserData.userName,
                  photoURL: followingUserData.photoURL || "/default-avatar.png",
                  isFollowing: true,
                };
              }
              return null;
            })
          );
          setFollowingData(followingProfiles.filter((user) => user));
        }
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleFollowToggle = async (followingUser) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const userRef = doc(db, "perfil", user.uid);
      const followingRef = doc(db, "perfil", followingUser.uid);

      if (followingUser.isFollowing) {
        await updateDoc(userRef, {
          following: arrayRemove(followingUser.uid),
        });
        await updateDoc(followingRef, {
          followers: arrayRemove(user.uid),
        });
      } else {
        await updateDoc(userRef, {
          following: arrayUnion(followingUser.uid),
        });
        await updateDoc(followingRef, {
          followers: arrayUnion(user.uid),
        });
      }

      setFollowingData((prevFollowing) =>
        prevFollowing.map((user) =>
          user.uid === followingUser.uid
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar el seguimiento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedFollowing = followingData.sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );
  const paginatedFollowing = sortedFollowing.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(sortedFollowing.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
                $active={activeTab === "followers"}
                onClick={() => {
                  setActiveTab("followers");
                  navigate(`/profile/${userId || user.uid}/followers`);
                }}
              >
                Followers
              </Tab>
              <Tab
                $active={activeTab === "following"}
                onClick={() => {
                  setActiveTab("following");
                  navigate(`/profile/${userId || user.uid}/following`);
                }}
              >
                Following
              </Tab>
            </Tabs>
            <Content>
              <FollowingList>
                {paginatedFollowing.map((followingUser) => (
                  <FollowingItem key={followingUser.uid}>
                    <FollowingAvatar src={followingUser.photoURL} alt="Avatar" />
                    <FollowingInfo>
                      <FollowingName>{followingUser.displayName}</FollowingName>
                      <FollowingHandle>@{followingUser.userName}</FollowingHandle>
                    </FollowingInfo>
                    <FollowButton
                      following={followingUser.isFollowing}
                      onClick={() => handleFollowToggle(followingUser)}
                      disabled={isLoading}
                    >
                      {followingUser.isFollowing ? "Following" : "Follow"}
                    </FollowButton>
                  </FollowingItem>
                ))}
              </FollowingList>
              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Preview
                  </PaginationButton>
                  <span>
                    Page {currentPage} de {totalPages}
                  </span>
                  <PaginationButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PaginationButton>
                </PaginationContainer>
              )}
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

export default Following;
