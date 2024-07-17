// Get questionID from current URL, Convert questionID to index, Create key string and retrieves question from JSON.

import QuestionBox from "./QuestionBox";

const QuestionCustom = (question) => {


  return (
      <div>
        <QuestionBox question={question.question} />       
      </div>      
  );
};

export default QuestionCustom;