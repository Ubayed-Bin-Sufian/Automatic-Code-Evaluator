// Get questionID from current URL, Convert questionID to index, Create key string and retrieves question from JSON.
import questions from "../data/questionFormat.json"
import { useParams } from "react-router-dom";
import CodeEditorWindow from "./CodeEditorWindow";

const HintAnsSamplecode = () => {

  const { questionID } = useParams();  // Destructure the questionID from useParams
  
  console.log({ questionID });  // For debuggin purpose

  const questionIndex = parseInt(questionID) - 1; // Convert questionID (which is a string) to an index (an integer)
  const question = questions[questionIndex];  // Get the question object using the index
  const hint = question["Hint"];  // Access the hint from the question object
  const answer = question["Answer"];  // Access the answer from the question object
  const samplecode = question["SampleCode"];  // Access the sample code from the question object
  
  console.log(question)  // For debugging purpose
  console.log(hint)  // For debugging purpose
  console.log(answer)  // For debugging purpose
  console.log(samplecode)  // For debugging purpose

  return (
      <CodeEditorWindow hintAnsSamplecode={[hint, answer, samplecode]}/>
  );
};

export default HintAnsSamplecode;