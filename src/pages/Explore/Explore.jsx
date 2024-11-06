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
    { name: "John", profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HBG7VE4Vj7zQVcxw8rM-rgpLAUWVIpQw3w&s" },
    { name: "Emily", profilePic: "https://laboratoriosniam.com/wp-content/uploads/2018/07/michael-dam-258165-unsplash_WEB2.jpg" },
    { name: "David", profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqcVXIgWCvTbb55lDj91N_g2rd0F3rma21CA&s" },
    { name: "Sarah", profilePic: "https://pymstatic.com/5844/conversions/personas-emocionales-wide_webp.webp" },
    { name: "Michael", profilePic: "https://img.freepik.com/fotos-premium/foto-alguien-que-esta-pensando-algo_831338-1457.jpg?w=360" },
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
