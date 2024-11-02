import React from "react";
import { Sidebar } from "../../Components/Sidebar/index";
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import {
  ExploreContainer,
  SectionTitle,
  SuggestionsContainer,
  UserSuggestions,
  UserProfilePicture,
  UserName,
  FollowButton,
} from "./styles";
import { UserSearchBar } from "../../Components/UsersSearchBar/UserSearchBar";
import { Container, SidebarContainer, WidgetsContainer } from "../../pages/Home/styles";

const Explore = () => {

  const userSuggestions = [
    { name: "John", profilePic: "http://via.placeholder.com/40" },
    { name: "Emily", profilePic: "http://via.placeholder.com/40" },
    { name: "David", profilePic: "http://via.placeholder.com/40" },
    { name: "Sarah", profilePic: "http://via.placeholder.com/40" },
    { name: "Michael", profilePic: "http://via.placeholder.com/40" },
  ];

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
            {userSuggestions.map((user, index) => (
              <UserSuggestions key={index}>
                <UserProfilePicture src={user.profilePic} alt={user.name} />
                <UserName>{user.name}</UserName>
                <FollowButton>Follow</FollowButton>
              </UserSuggestions>
            ))}
            ;
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
