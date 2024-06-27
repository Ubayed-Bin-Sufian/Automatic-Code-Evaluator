import QuestionBox from "./QuestionBox";
import questions from "../data/questions.json"
import { useParams } from "react-router-dom";

const Questions = () => {

  const {questionID} = useParams();
  console.log(questionID);

  return (
      <>
        <QuestionBox question={questions[0].Question1} />             
      </>      
  );
};

export default Questions;