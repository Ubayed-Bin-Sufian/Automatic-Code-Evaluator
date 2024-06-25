import React, { useState, useEffect } from "react";
import QuestionBox from "./QuestionBox";

const Question1 = () => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        setQuestion(data["Question-1"]);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, []);    

  return (
      <>
        <QuestionBox question={question} setQuestion={setQuestion} />       
      </>
  );
};

export default Question1;
