import React, {useState} from "react";
import QuestionBox from "./QuestionBox";

const Question1 = () => {
  const [question, setQuestion] = useState(
    "Question-1: What is the mean (average) of the following set of numbers: 4, 8, 15, 16, 23, 42?" 
  )

  return (
      <>
        <QuestionBox question={question} setQuestion={setQuestion} />       
      </>
  );
};

export default Question1;
