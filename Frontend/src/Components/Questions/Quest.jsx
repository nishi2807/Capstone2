import React, { useState } from "react";
import "./Quest.css";
import { useNavigate } from "react-router-dom";
import { Button, notification } from 'antd';

const questions = [
  {
    id: 1,
    text: "What is the primary purpose of cybersecurity awareness training in an organization?",
    options: [
      { id: "A", text: "To block all incoming cyber threats" },
      { id: "B", text: "To identify advanced persistent threats" },
      {
        id: "C",
        text: "To raise awareness and educate employees about security risks",
      },
      { id: "D", text: "To conduct penetration testing" },
    ],
  },
  {
    id: 2,
    text: "What are some common social engineering techniques used by attackers?",
    options: [
      { id: "A", text: "Encryption and decryption" },
      { id: "B", text: "SQL injection and XSS" },
      { id: "C", text: "Phishing and pretexting" },
      { id: "D", text: "Firewall and IDS/IPS" },
    ],
  },
  {
    id: 3,
    text: "What is the main purpose of using Two-Factor Authentication (2FA)?",
    options: [
      { id: "A", text: "To make login processes more complex" },
      { id: "B", text: "To remember passwords more easily" },
      {
        id: "C",
        text: "To add an extra layer of security to authentication",
      },
      { id: "D", text: "To block unauthorized users from accessing a network" },
    ],
  },
  {
    id: 4,
    text: "Which of the following is NOT a common type of cyber threat?",
    options: [
      { id: "A", text: " Phishing" },
      { id: "B", text: "Malware" },
      {
        id: "C",
        text: "Encryption",
      },
      { id: "D", text: "Social Engineering" },
    ],
  },
  {
    id: 5,
    text: "What is a typical characteristic of a strong password?",
    options: [
      { id: "A", text: "It should be a single word, easy to remember." },
      {
        id: "B",
        text: " It should contain a combination of letters, numbers, and special characters.",
      },
      {
        id: "C",
        text: "It should be identical to the username.",
      },
      { id: "D", text: "It should be short and simple." },
    ],
  },
  {
    id: 6,
    text: "What does HTTPS stand for in the context of web security?",
    options: [
      { id: "A", text: "Hyper Text Transfer Protocol Secure." },
      { id: "B", text: " High Efficiency Transport Protocol Service" },
      {
        id: "C",
        text: "Hostile Environment Threat Prevention System.",
      },
      {
        id: "D",
        text: "Hyper Transfer of Encrypted Passwords for Secure Sites.",
      },
    ],
  },
  {
    id: 7,
    text: "What is the purpose of using email encryption?",
    options: [
      { id: "A", text: "To block all incoming emails." },
      { id: "B", text: " To hide email sender information." },
      {
        id: "C",
        text: "To protect the confidentiality of email content during transmission.",
      },
      { id: "D", text: " To increase email storage space." },
    ],
  },
  {
    id: 8,
    text: "When securing a mobile device, what is the importance of app permissions?",
    options: [
      { id: "A", text: "They have no impact on security." },
      {
        id: "B",
        text: "They ensure all apps have unlimited access to device resources.",
      },
      {
        id: "C",
        text: "They control what data and device features apps can access.",
      },
      { id: "D", text: "They slow down the device's performance." },
    ],
  },
  {
    id: 9,
    text: "What is the primary purpose of an Intrusion Detection System (IDS)?",
    options: [
      { id: "A", text: "To provide internet access." },
      { id: "B", text: " To block all incoming traffic.." },
      {
        id: "C",
        text: "To detect and alert on suspicious network activities.",
      },
      { id: "D", text: "To increase network bandwidth." },
    ],
  },
  {
    id: 10,
    text: "What security component is designed to establish secure communication over untrusted networks, such as the internet?",
    options: [
      { id: "A", text: "Antivirus software" },
      { id: "B", text: "Firewall" },
      { id: "C", text: "VPN" },
      { id: "D", text: "Intrusion Prevention System (IPS)" },
    ],
  },
];

const answer = ["C", "A", "C", "D", "A", "B", "C", "D", "C", "A"];



function Questions() {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [que, setQue] = useState(0);

  const handleAnswerClick = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer === answer[que]) {
      if (que < questions.length - 1) {
        setSelectedAnswer(null);
        setQue(que + 1);
      } else {
        navigate("/");
      }
    } else {
      notification.error({
        message: "Worng Option",
        description: "First select the right option",
        duration: 1
      })
    }
  };

  return (
    <div className="ques-div">
      <div className="guestion">
        <div className="Q">Question {questions[que].id}:</div>
        <div className="quest">{questions[que].text}</div>
      </div>
      <tbody className="table">
        <tr
          id="row"
          onClick={() => {
            setSelectedAnswer("A");
          }}
        >
          <td id="id">{questions[que].options[0].id}.</td>
          <td>{questions[que].options[0].text}</td>
        </tr>
        <tr
          id="row"
          onClick={() => {
            setSelectedAnswer("B");
          }}
        >
          <td id="id">{questions[que].options[1].id}.</td>
          <td>{questions[que].options[1].text}</td>
        </tr>
        <tr
          id="row"
          onClick={() => {
            setSelectedAnswer("C");
          }}
        >
          <td id="id">{questions[que].options[2].id}.</td>
          <td>{questions[que].options[2].text}</td>
        </tr>
        <tr
          id="row"
          onClick={() => {
            setSelectedAnswer("D");
          }}
        >
          <td id="id">{questions[que].options[3].id}.</td>
          <td>{questions[que].options[3].text}</td>
        </tr>
      </tbody>
      {selectedAnswer && (
        <div className="btn-con">
          {selectedAnswer === answer[que] ? (
            <div className="correct">Correct</div>
          ) : (
            <div className="wrong">Wrong</div>
          )}
          <Button className="ques-btn" type="primary" onClick={handleNext}>
            {que < questions.length - 1 ? "Next" : "Complete"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Questions;
