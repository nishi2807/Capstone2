import React, { useEffect, useState } from "react";
import "./coursescreen.css";
import useGetCookie from "../../Hooks/useGetCookie";
import Divider from "../../Components/Divider/divider";
import { path } from "../../Assets/pdf/path";
import ChatBot from "../../Components/ChatBot/ChatBot";
import Questions from "../../Components/Questions/Quest";
import { useNavigate } from "react-router-dom";

const PPT_path = path.PPT5;
const topics = [
  "Introduction",
  "Empowering Cybersecurity Awareness",
  "Understanding Cyber Threats",
  "Mastering Password Security",
  "Spotting Phishing Attacks",
  "Navigating Safely Online",
  "Enhancing Security with MFA",
  "Incident Reporting Made Easy",
  "Securing Smart Devices",
  "Safeguarding Sensitive Information",
];

const modules = topics.map((p, i) => ({
  topic: p,
  ppt: PPT_path[i + 1],
  isCompleted: false,
}));

const modulesLength = modules.length;

function Course_Screen() {
  const getCookie = useGetCookie();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  // const [displayPPT, setDisplayPPT] = useState(`url(${PPT_path[1]})`);
  const [completeCount, setCompleteCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startChat, setStartChat] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (!email) {
      const email = getCookie("Email");
      setEmail(email);
    }
  }, [email]);

  const handleTopicClick = (key) => {
    if (key + 2 <= modulesLength + 1) {
      setCurrentIndex(key);
      modules[key].isCompleted = true;
    }

    setCompleteCount(modules.filter((module) => module.isCompleted).length);
  };

  const handlePrevBTN = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextBTN = () => {
    if (currentIndex < modulesLength - 1) {
      setCurrentIndex(currentIndex + 1);
      modules[currentIndex].isCompleted = true;
    } else if (currentIndex === modulesLength - 1) {
      modules[currentIndex].isCompleted = true;
      setShowQuestion(true);
    }

    setCompleteCount(modules.filter((module) => module.isCompleted).length);
  };

  return (
    <div className="main-screen">
      <div className="app-bar">
        <div className="project-title" onClick={() => {navigate('/')}}></div>
        <div className="profile">
          <div className="user-details">
            {/* <div className="name">{name}</div> */}
            <div className="useremail">{email}</div>
          </div>
          <div className="profile-pic"></div>
        </div>
      </div>
      <div className="c-main-div">
        <div className="side-menu">
          <div className="menu-icon">
            <div className="ic-menu"></div>
          </div>
          <div className="menu-content">
            <div className="menu-title">Cybersecurity Awareness</div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(completeCount / modulesLength) * 100}%` }}
              ></div>
            </div>
            <Divider />

            {modules.map((data, index) => (
              <div
                className="topics"
                key={index}
                style={{ fontWeight: data.isCompleted ? 500 : 700 }}
                onClick={() => handleTopicClick(index)}
              >
                {data.topic}
              </div>
            ))}
          </div>
        </div>
        <div className="present">
          {!showQuestion && (
            <>
              <div
                className="ppt-content"
                style={{ backgroundImage: `url(${modules[currentIndex].ppt})` }}
              ></div>
              {currentIndex !== 0 && (
                <button className="prev-btn" id="btn" onClick={handlePrevBTN}>
                  Prev
                </button>
              )}
              <button className="next-btn" id="btn" onClick={handleNextBTN}>
                {currentIndex === modulesLength - 1 ? "Complete" : "Next"}
              </button>
            </>
          )}
          {showQuestion && (
            <Questions />
          )}
        </div>
        {/* Chat BOT */}
        <div
          className="chat-bot"
          onClick={() => setStartChat(!startChat)}
        ></div>
        {startChat && <ChatBot />}
      </div>
    </div>
  );
}

export default Course_Screen;
