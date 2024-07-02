import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CustomInput from "./CustomInput";
import questions from "../data/questionFormat.json";

const TestCases = () => {
  const { questionID } = useParams();
  const questionIndex = parseInt(questionID) - 1;
  const question = questions[questionIndex];
  const testCases = question["TestCases"];

  // Function to format test cases into a string
  const formatTestCases = (testCases) => {

    // Map over each test case in the testCases array
    return testCases.map(testCase => {

    // Return a formatted string for each test case with description, input, and expected output
    return `Description: ${testCase.description}\nInput: ${JSON.stringify(testCase.input)}\nExpected Output: ${testCase.expected_output}\n`;
    }).join('\n'); // Join all formatted test case strings into a single string, separated by new lines
    };

  // Initialize state variable customInput with the formatted test cases string
  const [customInput, setCustomInput] = useState(formatTestCases(testCases));

  return (
    <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
  );
};

export default TestCases;
