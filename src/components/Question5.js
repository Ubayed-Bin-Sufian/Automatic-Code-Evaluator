import React, {useState} from "react";
import QuestionBox from "./QuestionBox";

const Question5 = () => {
  const [question, setQuestion] = useState(
    "Question - 5: What is a scatter plot and when would you use it?" 
  )

  return (
      <>
        <QuestionBox question={question} setQuestion={setQuestion} />       
      </>
  );
};

export default Question5;
