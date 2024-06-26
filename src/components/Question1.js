import QuestionBox from "./QuestionBox";
import questions from "../data/questions.json"

const Question1 = () => {

  return (
      <>
        <QuestionBox question={questions[0].Question1} />             
      </>      
  );
};

export default Question1;