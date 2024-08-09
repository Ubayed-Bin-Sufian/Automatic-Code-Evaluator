import React, { useEffect, useState } from "react";
import CodeEditorWindow from "../../components/CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../utils/general";
import { languageOptions } from "../../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../lib/defineTheme";
import useKeyPress from "../../hooks/useKeyPress";
import OutputWindow from "../../components/OutputWindow";
import CustomInput from "../../components/CustomInput";
import OutputDetails from "../../components/OutputDetails";
import ThemeDropdown from "../../components/ThemeDropdown";
import OutputDetailsTestCases from "../../components/OutputDetailsTestCases";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import QuestionCustom from "../../components/QuestionCustom";
import LanguagesDropdownCustom from "../../components/LanguagesDropdownCustom";

const Coding = () => {
  const { questionId } = useParams();

  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [outputDetailsTestCases, setOutputDetailsTestCases] = useState(null);  // For Test Cases
  const [processing, setProcessing] = useState(null);
  const [processingTestCases, setProcessingTestCases] = useState(null)  // For Test Cases
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState("");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const [code, setCode] = useState("");
  const [question, setQuestion] = useState("");  
  const [numTestCases, setNumTestCases] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [activeComponent, setActiveComponent] = useState(null);
  
  useEffect(() => {
    if (questionId) {
      fetchDocumentData(questionId);
    }
  }, [questionId]);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  let testCaseJsonResult={
    correctanswer:0,
    totaltestcases:0,
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

const fetchDocumentData = async (documentId) => {
  setLoading(true);
  try {
    const docRef = doc(db, 'CodingQuestions', documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data)
      setQuestion(data.question);

      setCode(data.code);
      setTestCases(data.testCases);
      console.log("testCases", testCases)
      setCustomInput(data.testCases[0].input)
      setSelectedLanguage(data.selectedLanguage || '');
      setLanguage(languageOptions[data.selectedLanguage]);
      console.log(languageOptions[selectedLanguage])
      console.log("language",language)
      setNumTestCases(data.testCases.length.toString());
    } else {
      console.log("No such document!");
    }

    setLoading(false);
  } catch (error) {
    console.error("Error fetching document: ", error);
    setLoading(false);
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
        "X-RapidAPI-Key": "a0edca89aamshec6069b621d8350p1366f6jsn0878d6518676",
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
        "X-RapidAPI-Key": "a0edca89aamshec6069b621d8350p1366f6jsn0878d6518676",
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
        setActiveComponent('outputDetails');
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
        "X-RapidAPI-Key": "a0edca89aamshec6069b621d8350p1366f6jsn0878d6518676",
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
        setProcessingTestCases(false);

        let decodedOutput = atob(response.data.stdout).replace(/\s+/g, '');
        let cleanedExpectedOutput = (expectedoutput || '').replace(/\s+/g, '');
    
        if (decodedOutput === cleanedExpectedOutput) {
            console.log('I am in');
            console.log('correctanswer');
            testCaseJsonResult.correctanswer++;
        } else {
            console.log('Outputs do not match');
            console.log('Expected:', cleanedExpectedOutput);
            console.log('Received:', decodedOutput);
            
            // Check for additional details
            console.log('Length of expected output:', cleanedExpectedOutput.length);
            console.log('Length of received output:', decodedOutput.length);
    
            // Check for differences character by character
            for (let i = 0; i < Math.max(cleanedExpectedOutput.length, decodedOutput.length); i++) {
                if (cleanedExpectedOutput[i] !== decodedOutput[i]) {
                    console.log(`Difference at character ${i}: expected '${cleanedExpectedOutput[i]}' but got '${decodedOutput[i]}'`);
                    break; // Break at the first difference for brevity
                }
            }
        }
      
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessingTestCases(false);
      showErrorToast();
    }
  };

  // compileCustomInput function sends source code along with custom input to the Judge0 API for compilation and execution, and then checks the result against the expected output.
  const compileCustomInput = async (providedInput, providedOutput) => {
    setProcessingTestCases(true);
    console.log('code is compiled', code)
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
        "X-RapidAPI-Key": "a0edca89aamshec6069b621d8350p1366f6jsn0878d6518676",
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

    testCaseJsonResult.totaltestcases = testCases.length;
    
    const promises = testCases.map(testCase => {
      const { input, output: expectedOutput } = testCase;
      console.log(input);
      return compileCustomInput(input, expectedOutput);
    });

    try {
      await Promise.all(promises);
      showSuccessToast(`Test Cases Checked Successfully`);
    } catch (err) {
      console.error("Error compiling test cases:", err);
    } finally {
      setProcessingTestCases(false);
      setOutputDetailsTestCases(testCaseJsonResult);
      setActiveComponent('outputTestCases');
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
          {language && <LanguagesDropdownCustom onSelectChange={onSelectChange} defaultValue={language}/>}
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>        
      </div>

      <div className="px-4 py-1">         
         <QuestionCustom question={question}/> 
      </div>

      <div className="flex flex-row space-x-4 items-start px-4 py-4">        
        <div className="flex flex-col w-full h-full justify-start items-end">       
          {language &&
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          }        
        </div>
        
        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />          
          <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
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
          {activeComponent === 'outputDetails' && outputDetails && <OutputDetails outputDetails={outputDetails} />}
          {activeComponent === 'outputTestCases' && outputDetailsTestCases && <OutputDetailsTestCases outputDetailsTestCases={outputDetailsTestCases} />}
        </div>
      </div>      
    </>
  );
};

export default Coding;
