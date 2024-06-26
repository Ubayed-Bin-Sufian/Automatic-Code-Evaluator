import QuestionBox from "./QuestionBox";
import questions from "../data/questions.json"

const Question2 = () => {

  return (
      <>
        <QuestionBox question={questions[1].Question2} />       
      </>
  );
};

export default Question2;
