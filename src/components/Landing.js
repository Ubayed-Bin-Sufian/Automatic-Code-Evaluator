import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";

import { Routes, Route } from "react-router-dom";
import HintAnsSamplecode from "./HintAnsSamplecode";
import OutputDetailsTestCases from "./OutputDetailsTestCases";
import Questions from "./Questions";
import QuestionBox from "./QuestionBox";
import questionData from "../data/questionFormat.json"

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(input) {
      input = input.trim();

        // Find the position of the closing bracket
        let closingBracketIndex = input.indexOf(']') + 1;
        if (closingBracketIndex === 0) {
            throw new Error("Input format is incorrect.");
        }

        // Extract array part and number part
        let arrayPart = input.substring(0, closingBracketIndex);
        let numberPart = input.substring(closingBracketIndex).trim();

        // Remove the brackets and split by comma
        arrayPart = arrayPart.slice(1, -1); // Remove the [ and ] characters
        let x = arrayPart.split(',').map(Number); // Split by comma and convert to numbers

        let y = parseInt(numberPart);

        // Output the results
        
       console.log( binarySearch(x,y))
});
`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [outputDetailsTestCases, setOutputDetailsTestCases] = useState(null);  // For Test Cases
  const [processing, setProcessing] = useState(null);
  const [processingTestCases, setProcessingTestCases] = useState(null)  // For Test Cases
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [question, setQuestion] = useState("");  // Variable to store question

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };
  let testCaseJsonResult={
    totaltestcases:0,
    correcttestcases:0,
    
  }
  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  
const handleCompile = () => {
  setProcessing(true);
  const formData = {
    language_id: language.id,
    // encode source code in base64
    source_code: btoa(code),
    stdin: btoa(customInput),
  };
  const options = {
    method: "POST",
    url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "c652945428msh6a7968025ebb89bp12202cjsn087300a47178",
    },
    data: formData,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("res.data", response.data);
      const token = response.data.token;
      checkStatus(token);
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      // get error status
      let status = err.response.status;
      console.log("status", status);
      if (status === 429) {
        console.log("too many requests", status);

        showErrorToast(
          `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          10000
        );
      }
      setProcessing(false);
      console.log("catch block...", error);
    });
};
const checkStatus = async (token) => {
  const options = {
    method: "GET",
    url: `https://judge0-extra-ce.p.rapidapi.com/submissions/${token}`,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "c652945428msh6a7968025ebb89bp12202cjsn087300a47178",
    },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(() => {
        checkStatus(token);
      }, 2000);
      return;
    } else {
      setProcessing(false);
      setOutputDetails(response.data);
      showSuccessToast(`Compiled Successfully!`);
      console.log("response.data", response.data);
      return;
    }
  } catch (err) {
    console.log("err", err);
    setProcessing(false);
    showErrorToast();
  }
};

// Function to compare the output with an expected output
const checkStatusCustomInput = async (token, expectedoutput) => {
  const options = {
    method: "GET",
    url: `https://judge0-extra-ce.p.rapidapi.com/submissions/${token}`,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "c652945428msh6a7968025ebb89bp12202cjsn087300a47178",
    },
  };

  try {
    let response = await axios.request(options);  // Make the API request
    let statusId = response.data.status?.id;  // Extract the status ID

    // Check if the submission is still processing
    if (statusId === 1 || statusId === 2) {
      // Still processing, check again after 2 seconds
      setTimeout(() => {
        checkStatusCustomInput(token);
      }, 2000);
      return;
    } else {
      // Processing complete
      setProcessingTestCases(false);
      console.log('Answer:',atob(response.data.stdout))  // Decode and log the output
      console.log('Expected output:', expectedoutput)  // Log the expected output
      
      if (atob(response.data.stdout) == expectedoutput) {
        // If the output matches the expected output, increment correct answers
        console.log('Comparing compiled answer and expected output: CORRECT ANSWER')
        testCaseJsonResult.correcttestcases++
      } else {
        console.log('Comparing compiled answer and expected output: WRONG ANSWER')
      }
     
      console.log("response.data", response.data);  // Log the full response data
      return;
    }
  } catch (err) {
    // Handle errors
    console.log("err", err);
    setProcessingTestCases(false);
    showErrorToast();
  }
};

// compileCustomInput function sends source code along with custom input to the Judge0 API for compilation and execution, and then checks the result against the expected output.
const compileCustomInput = async (providedInput, providedOutput) => {
  setProcessingTestCases(true);

  const formData = {
    language_id: language.id,
    // encode source code in base64
    source_code: btoa(code),
    stdin: btoa(providedInput),
  };

  const options = {
    method: "POST",
    url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "c652945428msh6a7968025ebb89bp12202cjsn087300a47178",
    },
    data: formData,
  };

  try {
    const response = await axios.request(options);
    console.log("res.data", response.data);
    const token = response.data.token;
    await checkStatusCustomInput(token, providedOutput);
  } catch (err) {
    let error = err.response ? err.response.data : err;
    // get error status
    let status = err.response ? err.response.status : "Unknown";
    console.log("status", status);
    if (status === 429) {
      console.log("too many requests", status);
      showErrorToast(
        `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
        10000
      );
    }
    console.log("catch block...", error);
    setProcessingTestCases(false);
  }
};

// handleCompileTestCases function processes and compiles multiple test cases for a given question, checks the results, and updates the application state accordingly
const handleCompileTestCases = async () => {
  setProcessingTestCases(true);

  // Update total number of test cases
  testCaseJsonResult.totaltestcases = questionData[0].TestCases.length;
  console.log('Total test cases:', questionData[0].TestCases.length);
  console.log('Updated total test cases:', testCaseJsonResult);  // Logs the testCaseJsonResult object to confirm the update.

  const promises = questionData[0].TestCases.map(testCase => {
    const { input, expected_output: expectedOutput } = testCase;
    console.log("'input' from JSON:", input);
    return compileCustomInput(input, expectedOutput);
  });

  try {
    await Promise.all(promises);
    showSuccessToast("Test Cases Checked Successfully");
  } catch (err) {
    console.error("Error compiling test cases:", err);
  } finally {
    setProcessingTestCases(false);
    setOutputDetailsTestCases(testCaseJsonResult);
  }
};
  
  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>        
      </div>

      <div className="px-4 py-4">         
          <Routes>
            <Route path="/" element={<QuestionBox question={question} setQuestion={setQuestion} />} />
            <Route path="question/:questionID" element={<Questions />} />
            <Route path="*" element= {"PAGE NOT FOUND"} />
          </Routes>          
      </div>

      <div className="flex flex-row space-x-4 items-start px-4 py-4">        
        <div className="flex flex-col w-full h-full justify-start items-end">
          <Routes>
            <Route path="/" element= {<CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value} />}
            />
            <Route path="question/:questionID" element={<HintAnsSamplecode
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value} />} />
          </Routes>
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />          
          <CustomInput />            

          <div className="flex flex-row space-x-3 justify-end">
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Run"}
            </button>

            {/* Button for Test Case added but needs comparison with output */}
            <button
              onClick={handleCompileTestCases}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processingTestCases ? "Processing..." : "Submit"}
            </button>                      
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          {outputDetailsTestCases && <OutputDetailsTestCases outputDetailsTestCases={outputDetailsTestCases} />}
        </div>
      </div>      
    </>
  );
};
export default Landing;
