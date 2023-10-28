import React, { useState } from "react";
import "./mainscreen.css";
import Button from "../../Components/Button/button";
import { path } from "../../Assets/pdf/path";

function MainScreen() {
  const [islogin, setIslogin] = useState(false);
  return (
    // main container
    <div className="main-screen">
      <div className="app-bar">
        <div className="project-title">Project Name</div>
        {!islogin && (
          <div className="button">
            <Button title="Login" />
            <Button title="Signup" />
          </div>
        )}
        {islogin && (
          <div className="profile">
            <div className="user-details">
              <div className="name">Username</div>
              <div className="email">example@gmail.com</div>
            </div>
            <div className="profile-pic"></div>
          </div>
        )}
      </div>
      <div className="main-content">
        <div className="main-text"></div>
        <div className="main-ppt">
          <div className="ppt-side-bar">
            <div
              className="content-1"
              style={{
                backgroundImage: `url(${path.PPT2[1]})`,
              }}
            ></div>
            <div
              className="content-2"
              style={{
                backgroundImage: `url(${path.PPT3[1]})`,
              }}
            ></div>
            <div
              className="content-3"
              style={{
                backgroundImage: `url(${path.PPT4[1]})`,
              }}
            ></div>
          </div>
          <div className="ppt"
          style={{
            backgroundImage: `url(${path.PPT1[1]})`,
          }}></div>
        </div>
        <div className="main-enroll"></div>
      </div>
    </div>
  );
}

export default MainScreen;
