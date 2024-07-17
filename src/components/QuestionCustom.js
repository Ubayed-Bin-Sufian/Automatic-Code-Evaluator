import QuestionBox from "./QuestionBox";

const QuestionCustom = (question) => {
  return (
      <div>
        <QuestionBox question={question.question} />       
      </div>      
  );
};

export default QuestionCustom;