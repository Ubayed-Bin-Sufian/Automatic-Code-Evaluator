import React, {useState} from "react";
import QuestionBox from "./QuestionBox";

const Question4 = () => {
  const [question, setQuestion] = useState(
    "Question - 4: What is a histogram and how is it used?" 
  )

  return (
      <>
        <QuestionBox question={question} setQuestion={setQuestion} />       
      </>
  );
};

export default Question4;
