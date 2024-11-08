import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../Components/Sidebar/index";
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import {
  ExploreContainer,
  SectionTitle,
  SuggestionsContainer,
  UserSuggestions,
  UserProfilePicture,
  FollowButton,
  StyledLink,
} from "./styles";
import { UserSearchBar } from "../../Components/UsersSearchBar/UserSearchBar";
import {
  Container,
  SidebarContainer,
  WidgetsContainer,
} from "../../pages/Home/styles";
import { db } from "../../Connecting_to_Firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { UserContext } from "../../auth/Contexts/UserContext";

const Explore = () => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "perfil");
      const userSnapshot = await getDocs(usersCollection);
      const usersList = userSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isFollowing: (doc.data().followers || []).includes(user.uid),
        }))

        .filter((u) => u.id !== user.uid)

        .sort((a, b) => a.displayName.localeCompare(b.displayName));

      setUserSuggestions(usersList);
    };

    fetchUsers();
  }, [user.uid]);

  const handleFollowToggle = async (userId, isFollowing) => {
    try {
      const userDoc = doc(db, "perfil", user.uid);
      const followedUserDoc = doc(db, "perfil", userId);

      if (isFollowing) {
        await updateDoc(userDoc, {
          following: arrayRemove(userId),
        });
        await updateDoc(followedUserDoc, {
          followers: arrayRemove(user.uid),
        });
      } else {
        await updateDoc(userDoc, {
          following: arrayUnion(userId),
        });
        await updateDoc(followedUserDoc, {
          followers: arrayUnion(user.uid),
        });
      }

      setUserSuggestions((prevSuggestions) =>
        prevSuggestions.map((suggestion) =>
          suggestion.id === userId
            ? {
                ...suggestion,
                isFollowing: !isFollowing,
              }
            : suggestion
        )
      );
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="App">
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <ExploreContainer>
          <UserSearchBar />
          <SectionTitle>Suggestions for you</SectionTitle>
          <SuggestionsContainer>
            {userSuggestions.map((userSuggestion) => (
              <UserSuggestions key={userSuggestion.id}>
                <UserProfilePicture
                  src={
                    userSuggestion.photoURL || "https://via.placeholder.com/150"
                  }
                  alt={userSuggestion.displayName}
                />
                <StyledLink to={`/profile/${userSuggestion.id}`}>
                  {userSuggestion.displayName}
                </StyledLink>
                <FollowButton
                  onClick={() =>
                    handleFollowToggle(
                      userSuggestion.id,
                      userSuggestion.isFollowing
                    )
                  }
                >
                  {userSuggestion.isFollowing ? "Following" : "Follow"}
                </FollowButton>
              </UserSuggestions>
            ))}
          </SuggestionsContainer>
        </ExploreContainer>
        <WidgetsContainer>
          <Widgets />
        </WidgetsContainer>
      </div>
    </>
  );
};

export default Explore;
