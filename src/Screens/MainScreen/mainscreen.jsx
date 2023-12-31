import React, { useState } from "react";
import "./mainscreen.css";
import Button from "../../Components/Button/button";
import { path } from "../../Assets/pdf/path";
import axios from "axios";

function MainScreen() {
  const [islogin, setIslogin] = useState(false);
  const [issignup, setIssignup] = useState(true);
  // const [mainPPT, setMainPPT] = useState(path.PPT1[1]);
  const [index, setIndex] = useState(1);
  const [PPT, setPPT] = useState({
    1: path.PPT1,
    2: path.PPT2,
    3: path.PPT3,
    4: path.PPT4,
  });
  const [loc, setLoc] = useState({ 1: 2, 2: 3, 3: 4, 4: 1 });
  const [data, setData] = useState([
    {
      title: "Your Trusted Cybersecurity Partner",
      desc: "We bring years of expertise and a commitment to your digital security. Our team of cybersecurity professionals is here to support and educate you every step of the way.",
    },
    {
      title: "Comprehensive Training Programs",
      desc: "Our platform offers a range of training programs suitable for beginners and experts alike. Whether you are an individual looking to enhance your online safety or an organization aiming to fortify your cybersecurity defenses, we have tailored programs for you.",
    },
    {
      title: "Real-World Practical Knowledge",
      desc: "Our training modules are designed to provide practical, real-world solutions. We believe in hands-on learning that equips you with the skills to protect yourself and your digital assets effectively.",
    },
    {
      title: "Stay Ahead of Threats",
      desc: "Cyber threats are constantly evolving. With CyberSafe, you will stay informed about the latest threats and best practices. Our courses are regularly updated to keep you ahead of cybercriminals.",
    },
    {
      title: "Community and Support",
      desc: "Join a thriving community of like-minded individuals. Share your experiences, ask questions, and grow your cybersecurity knowledge. Our support team is always ready to assist.",
    },
    {
      title: "Certification and Recognition",
      desc: "Our certifications are respected in the cybersecurity community and can enhance your career opportunities, demonstrating your commitment to digital security excellence.",
    },
  ]);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [otp, setOtp] = useState(null);
  const [name, setName] = useState(null);

  const change_page = () => {
    let len = Object.keys(PPT[loc[4]]).length;
    console.log(len);
    if (index >= len) {
      setIndex(1);
    } else {
      setIndex(index + 1);
    }
  };

  const handleLogIn = () => {
    if (email && pass) {
      axios
        .post("http://localhost:8004/login", {
          email: email,
          password: pass,
        })
        .then((res) => {
          if (res.data.message === true) {
            setIslogin(true);
            setIssignup(true);
            setName(res.data.name);
          } else {
            alert("Login Fails");
          }
        })
        .catch((err) => {
          console.error("GET Request Error:", err);
        });
    }
  };

  // sign up function
  const handleSignUp = () => {
    if (issignup) {
      setIslogin(true);
      setIssignup(false);

      axios
        .post("http://localhost:8003/send-email", {
          to: email,
        })
        .then((res) => {
          if (res.data.message === "Email sent successfully") {
            alert(`OTP is mailed to ${email}`);
          }
        })
        .catch((err) => {
          console.error("GET Request Error:", err);
        });
    } else if (email && pass) {
      axios
        .post("http://localhost:8003/verify-otp", {
          email: email,
          otp: otp,
        })
        .then((res) => {
          if (res.data.message === "Verified") {
            alert(`User is verified`);
            setIssignup(true);
            axios
              .post("http://localhost:8004/signup", {
                email: email,
                password: pass,
              })
              .catch((err) => {
                console.error("GET Request Error:", err);
              });
          } else {
            alert("Incorrect OTP");
          }
        })
        .catch((err) => {
          console.error("GET Request Error:", err);
        });
    }
  };

  return (
    <div className="main-screen">
      <div className="app-bar">
        <div className="project-title"></div>
        {!islogin && (
          <div className="button">
            <Button title="Login" />
            <Button title="Signup" />
          </div>
        )}
        {islogin && (
          <div className="profile">
            <div className="user-details">
              {/* <div className="name">{name}</div> */}
              <div className="useremail">{email}</div>
            </div>
            <div className="profile-pic"></div>
          </div>
        )}
      </div>
      <div className="main-content">
        <div className="main-text">
          <div className="details">
            <div className="details-content">
              <div style={{ marginBottom: 10 }}>About us</div>
              We are dedicated to safegaurding your digital world. Our mission is to empower individuals and organizations with the knowledge and skills to protect themselves from online threats. In today’s interconnected landscape, cybersecurity is not an option.  It’s a necessity. We are here to guide you through this journey.
              <div style={{ fontSize: 18, marginTop: 30 }}>
                Stay Safe, Stay Secure, Start Learning with us.
              </div>
            </div>
            <div className="content-img"></div>
          </div>
          <div className="whywe">
            <div className="whywe-title">Why Choose CyberSafe?</div>
            <div className="whywe-main">
              {data.map((content) => {
                return (
                  <div className="whywe-content">
                    <div className="why-con-title">{content.title}</div>
                    <div className="why-con-desc">{content.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="main-ppt">
          <div className="ppt-side-bar">
            <div
              className="content-1"
              onClick={() => {
                setLoc({ ...loc, 4: loc[1], 1: loc[4] });
                setIndex(1);
              }}
              style={{
                backgroundImage: `url(${PPT[loc[1]][1]})`,
              }}
            ></div>
            <div
              className="content-2"
              onClick={() => {
                setLoc({ ...loc, 4: loc[2], 2: loc[4] });
                setIndex(1);
              }}
              style={{
                backgroundImage: `url(${PPT[loc[2]][1]})`,
              }}
            ></div>
            <div
              className="content-3"
              onClick={() => {
                setLoc({ ...loc, 4: loc[3], 3: loc[4] });
                setIndex(1);
              }}
              style={{
                backgroundImage: `url(${PPT[loc[3]][1]})`,
              }}
            ></div>
          </div>
          <div
            className="ppt"
            onClick={() => {
              change_page();
            }}
            style={{
              backgroundImage: `url(${PPT[loc[4]][index]})`,
            }}
          ></div>
        </div>
        <div className="main-enroll">
          <div className="logo-details"></div>
          {!islogin && (
            <>
              <div className="signup">
                <div id="lable">
                  <label>Email</label>
                </div>
                <input
                  value={email}
                  className="email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)} // Use onChange instead of onClick
                ></input>
                <div id="lable">
                  <label>Password</label>
                </div>
                <input
                  value={pass}
                  className="pass"
                  type="password"
                  onChange={(e) => setPass(e.target.value)} // Use onChange instead of onClick
                ></input>
                <div className="btns">
                  <button
                    className="login-btn"
                    onClick={() => {
                      handleLogIn();
                    }}
                  >
                    Log In
                  </button>
                  <button
                    className="signup-btn"
                    onClick={() => {
                      handleSignUp();
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </>
          )}
          {!issignup && (
            <>
              <div className="signup">
                <div id="lable">
                  <label>OTP</label>
                </div>
                <input
                  value={issignup ? email : otp}
                  className="email"
                  type="text"
                  onChange={(e) => {
                    issignup
                      ? setEmail(e.target.value)
                      : setOtp(e.target.value);
                  }} // Use onChange instead of onClick
                ></input>
                <div className="btns">
                  <button
                    className="login-btn"
                    onClick={() => {
                      handleLogIn();
                    }}
                    style={{ visibility: !issignup && "hidden" }}
                  >
                    Log In
                  </button>
                  <button
                    className="signup-btn"
                    onClick={() => {
                      handleSignUp();
                    }}
                  >
                    {issignup ? "Sign Up" : "OTP"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
