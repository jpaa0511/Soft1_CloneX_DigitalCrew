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
  PaginationContainer,
  PaginationButton,
  BackButtonContainer,
  FollowButton,
  FollowerAvatar,
} from "./styles";
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

function Follower() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [followersData, setFollowersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

          const followersList = profile.followers || [];
          const followersProfiles = await Promise.all(
            followersList.map(async (followerUserId) => {
              const followerUserDoc = doc(db, "perfil", followerUserId);
              const followerUserSnapshot = await getDoc(followerUserDoc);
              if (followerUserSnapshot.exists()) {
                const followerUserData = followerUserSnapshot.data();
                return {
                  uid: followerUserId,
                  displayName: followerUserData.displayName,
                  userName: followerUserData.userName,
                  photoURL: followerUserData.photoURL || "/default-avatar.png",
                  isFollowing:
                    profile.following?.includes(followerUserId) || false,
                };
              }
              return null;
            })
          );
          setFollowersData(followersProfiles.filter((user) => user));
        }
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleFollowToggle = async (followerUser) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const userRef = doc(db, "perfil", user.uid);
      const followerRef = doc(db, "perfil", followerUser.uid);

      if (followerUser.isFollowing) {
        await updateDoc(userRef, {
          following: arrayRemove(followerUser.uid),
        });
        await updateDoc(followerRef, {
          followers: arrayRemove(user.uid),
        });
      } else {
        await updateDoc(userRef, {
          following: arrayUnion(followerUser.uid),
        });
        await updateDoc(followerRef, {
          followers: arrayUnion(user.uid),
        });
      }

      setFollowersData((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.uid === followerUser.uid
            ? { ...follower, isFollowing: !follower.isFollowing }
            : follower
        )
      );
    } catch (error) {
      console.error("Error updating follow status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedFollowers = followersData.sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );
  const paginatedFollowers = sortedFollowers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(sortedFollowers.length / pageSize);

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
                $active
                onClick={() => {
                  navigate(`/profile/${userId || user.uid}/followers`);
                }}
              >
                Followers
              </Tab>
              <Tab
                $active={false}
                onClick={() => {
                  navigate(`/profile/${userId || user.uid}/following`);
                }}
              >
                Following
              </Tab>
            </Tabs>
            <Content>
              <FollowerList>
                {paginatedFollowers.map((followerUser) => (
                  <FollowerItem key={followerUser.uid}>
                    <FollowerAvatar src={followerUser.photoURL} alt="Avatar" />
                    <FollowerInfo>
                      <FollowerName
                        onClick={() =>
                          navigate(`/profile/${followerUser.uid}`)
                        }
                      >
                        {followerUser.displayName}
                      </FollowerName>
                      <FollowerHandle>@{followerUser.userName}</FollowerHandle>
                    </FollowerInfo>
                    <FollowButton
                      onClick={() => handleFollowToggle(followerUser)}
                      disabled={isLoading}
                    >
                      {followerUser.isFollowing ? "Following" : "Follow"}
                    </FollowButton>
                  </FollowerItem>
                ))}
              </FollowerList>
              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </PaginationButton>
                  <span>
                    Page {currentPage} of {totalPages}
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

export default Follower;
