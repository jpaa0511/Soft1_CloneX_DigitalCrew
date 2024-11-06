import React from "react";
import { Sidebar } from "../../Components/Sidebar/index";
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import { Container, SidebarContainer, WidgetsContainer } from "./styles";
import { TwitterBoxs } from "../../Components/TweeterBox/TwitterBox";
import { Tweet } from "../../Components/Tweet/Tweet";


const MainPage = () => {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Container>
          <TwitterBoxs />
          <Tweet showAll={true}/>
        </Container>
        <WidgetsContainer>
          <Widgets />
        </WidgetsContainer>
      </div>
    </>
  );
};

export default MainPage;
