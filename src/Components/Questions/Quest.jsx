import React, { useState } from "react";
import "./Quest.css";
import { Button, Descriptions, Tag } from "antd";

const questions = [
    [
        {
            key: "1",
            label: "Question",
            span: 3,
            children:
              "What is the primary purpose of cybersecurity awareness training in an organization?",
          },
          {
            key: "2",
            label: "Option A",
            span: 1.5,
            value: "A",
            children: "To block all incoming cyber threats",
          },
          {
            key: "3",
            label: "Option B",
            span: 1.5,
            value: "B",
            children: "To identify advanced persistent threats",
          },
          {
            key: "4",
            label: "Option C",
            span: 1.5,
            value: "C",
            children: "To raise awareness and educate employees about security risks",
          },
          {
            key: "5",
            label: "Option D",
            span: 1.5,
            value: "D",
            children: "To conduct penetration testing",
          },
    ],
    [
        {
            key: "1",
            label: "Question",
            span: 3,
            children:
              "What are some common social engineering techniques used by attackers?",
          },
          {
            key: "2",
            label: "Option A",
            span: 1.5,
            value: "A",
            children: "Encryption and decryption",
          },
          {
            key: "3",
            label: "Option B",
            span: 1.5,
            value: "B",
            children: "SQL injection and XSS",
          },
          {
            key: "4",
            label: "Option C",
            span: 1.5,
            value: "C",
            children: "Phishing and pretexting",
          },
          {
            key: "5",
            label: "Option D",
            span: 1.5,
            value: "D",
            children: "Firewall and IDS/IPS",
          },
    ],
    [
        {
            key: "1",
            label: "Question",
            span: 3,
            children:
              "What is the main purpose of using Two-Factor Authentication (2FA)?",
          },
          {
            key: "2",
            label: "Option A",
            span: 1.5,
            value: "A",
            children: "To make login processes more complex",
          },
          {
            key: "3",
            label: "Option B",
            span: 1.5,
            value: "B",
            children: "To remember passwords more easily",
          },
          {
            key: "4",
            label: "Option C",
            span: 1.5,
            value: "C",
            children: "To add an extra layer of security to authentication",
          },
          {
            key: "5",
            label: "Option D",
            span: 1.5,
            value: "D",
            children: "To block unauthorized users from accessing a network",
          },
    ]
]

const answer = [
    'C',
    'C',
    'C',
    'C',
    'C',
    'B',
    'C',
    'C',
    'C',
    'A',
]

function Questions() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [show, setShow] = useState(0);

  const handleAnswerClick = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if(show < questions.length-1){
        setShow(show + 1)
        setSelectedAnswer(null)
    }
  }

  return (
    <div className="ques-div">
      <Descriptions
        title={`Question ${show + 1}`}
        layout="vertical"
        bordered
        items={questions[show]?.map((item) => ({
          ...item,
          label: (
            <div
              onClick={() => handleAnswerClick(item.value)}
              className={`answer-label ${
                selectedAnswer === item.value
                  ? item.value === answer[show] // Replace with the correct answer
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
            >
              {item.label}
              {selectedAnswer === item.value && (
                <Tag
                  color={item.value === answer[show] ? "green" : "red"}
                  style={{ marginLeft: "10px" }}
                >
                  {item.value === answer[show] ? "Correct" : "Wrong"}
                </Tag>
              )}
            </div>
          ),
        }))}
      />
      <div className="btn-con">
        <Button className="ques-btn" type="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Questions;
