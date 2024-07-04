// Get questionID from current URL, Convert questionID to index, Create key string and retrieves question from JSON.
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import questions from "../data/questionFormat.json"

const HintAnsSamplecode = ({ onChange, language, code, theme }) => {

  const { questionID } = useParams();  // Destructure the questionID from useParams
  
  console.log({ questionID });  // For debuggin purpose

  const questionIndex = parseInt(questionID) - 1; // Convert questionID (which is a string) to an index (an integer)
  const question = questions[questionIndex];  // Get the question object using the index
  const hint = question["Hint"];  // Access the hint from the question object
  const answer = question["Answer"];  // Access the answer from the question object
  const samplecode = question["SampleCode"];  // Access the sample code from the question object
  const hintAnsCode = `// Hint: ${hint}\n\n// Answer: ${answer}\n\n// Sample code\n\n${samplecode.split('\n').join('\n')}`;
  
  console.log(question)  // For debugging purpose
  console.log(hint)  // For debugging purpose
  console.log(answer)  // For debugging purpose
  console.log(samplecode)  // For debugging purpose

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const [value, setValue] = useState(hintAnsCode || "");

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="70vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default HintAnsSamplecode;