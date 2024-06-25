import React, {useState} from "react";
import QuestionBox from "./QuestionBox";

const Question2 = () => {
  const [question, setQuestion] = useState(
    "Question - 2: What is the median of the numbers 1, 3, 3, 6, 7, 8, 9?" 
  )

  return (
      <>
        <QuestionBox question={question} setQuestion={setQuestion} />       
      </>
  );
};

export default Question2;
