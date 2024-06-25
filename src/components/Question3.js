import React, {useState} from "react";
import QuestionBox from "./QuestionBox";

const Question3 = () => {
  const [question, setQuestion] = useState(
    "Question - 3: How do you find the mode of the following set of numbers: 1, 2, 2, 3, 4, 4, 4, 5?" 
  )

  return (
      <>
        <QuestionBox question={question} setQuestion={setQuestion} />       
      </>
  );
};

export default Question3;
