import QuestionBox from "./QuestionBox";
import questions from "../data/questions.json"

const Question3 = () => {

  return (
      <>
        <QuestionBox question={questions[2].Question3} />       
      </>
  );
};

export default Question3;
