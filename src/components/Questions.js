// Get questionID from current URL, Convert questionID to index, Create key string and retrieves question from JSON.

import QuestionBox from "./QuestionBox";
import questions from "../data/questionFormat.json"
import { useParams } from "react-router-dom";

const Questions = () => {

  const { questionID } = useParams();  // Destructure the questionID from useParams
  console.log({ questionID });  // For debuggin purpose

  const questionIndex = parseInt(questionID) - 1; // Convert questionID (which is a string) to an index (an integer)
  const questionKey = `Question${questionID}`;  // Uses template literals to construct a string
  const question = questions[questionIndex][questionKey];
  console.log(question)

  return (
      <div>
        <QuestionBox question={question} />       
      </div>      
  );
};

export default Questions;