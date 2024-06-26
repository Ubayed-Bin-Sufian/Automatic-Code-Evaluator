import QuestionBox from "./QuestionBox";
import questions from "../data/questions.json"

const Question5 = () => {

  return (
      <>
        <QuestionBox question={questions[4].Question5} />       
      </>
  );
};

export default Question5;
