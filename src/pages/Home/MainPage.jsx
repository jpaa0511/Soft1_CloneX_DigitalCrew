import React, { useContext } from "react";
import { Sidebar } from "../../Components/Sidebar/index";
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import { Container, SidebarContainer, WidgetsContainer } from "./styles";
import { TwitterBoxs } from "../../Components/TweeterBox/TwitterBox";
import { Tweet } from "../../Components/Tweet/Tweet";
import { UserContext } from "../../auth/Contexts/UserContext";

const MainPage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <GlobalStyles />
      <div className="App">
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Container>
          <TwitterBoxs />
          {user && <Tweet loggedInUserId={user.uid} showAll={true} />}
        </Container>
        <WidgetsContainer>
          <Widgets />
        </WidgetsContainer>
      </div>
    </>
  );
};

export default MainPage;
