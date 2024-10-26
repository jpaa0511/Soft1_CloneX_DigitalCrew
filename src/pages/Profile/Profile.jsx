import React from "react";
import { Sidebar } from "../../Components/Sidebar/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Widgets } from "../../Components/Widgets";
import GlobalStyles from "../../styles/StylesGlobal";
import { Container, SidebarContainer, WidgetsContainer } from "../Home/styles";

const Xprofile = () => {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Container>
          <div>
            <div className="">
              {/* Main Profile Section */}
              <div className="col-md-8 bg-black text-white py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  {/* Profile Avatar and Info */}
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-secondary"
                      style={{ width: "100px", height: "100px" }}
                    ></div>
                    <div className="ms-3">
                      <h2>Nombre de pila</h2>
                      <p>@usuario</p>
                      {/* <IconsOptions
                        Icon={HomeIcon}
                        text={"Born November 5, 2000"}
                      /> */}
                      <p>2,066 Following · 168 Followers</p>
                    </div>
                  </div>
                  {/* Edit Profile Button */}
                  <button className="btn btn-outline-primary">
                    Edit profile
                  </button>
                </div>

                {/* Tabs Section */}
                <ul className="nav nav-tabs mb-4">
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
                </ul>

                {/* Post Section */}
                <div className="bg-dark p-3 rounded mb-4">
                  <p>
                    <strong>jran10p</strong> · Nov 10, 2020
                  </p>
                  <p>
                    😍{" "}
                    <a href="#" className="text-primary">
                      t.co/snpZEYYBpP
                    </a>
                  </p>
                  <p className="text-muted">
                    This Post is from an account that no longer exists.{" "}
                    <a href="#" className="text-primary">
                      Learn more
                    </a>
                  </p>
                  <div className="d-flex justify-content-start">
                    <span className="me-3">💬 3</span>
                    <span className="me-3">🔁 10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <WidgetsContainer>
          <Widgets />
        </WidgetsContainer>
      </div>
    </>
  );
};

export default Xprofile;
