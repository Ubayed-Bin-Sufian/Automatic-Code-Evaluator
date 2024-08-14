import "react-toastify/dist/ReactToastify.css";
import { classnames } from "../../utils/general";
import { db } from '../../firebase/firebaseConfig';
import { defineTheme } from "../../lib/defineTheme";
import { doc, getDoc } from 'firebase/firestore';
import { languageOptions } from "../../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import CodeEditorWindow from "../../components/CodeEditorWindow";
import CustomInput from "../../components/CustomInput";
import LanguagesDropdownCustom from "../../components/LanguagesDropdownCustom";
import OutputDetails from "../../components/OutputDetails";
import OutputDetailsTestCases from "../../components/OutputDetailsTestCases";
import OutputWindow from "../../components/OutputWindow";
import QuestionCustom from "../../components/QuestionCustom";
import React, { useEffect, useState } from "react";
import ThemeDropdown from "../../components/ThemeDropdown";
import useKeyPress from "../../hooks/useKeyPress";
import Popup from "../../components/Popup";
const Coding = () => {
  const { questionId } = useParams();
  const [activeComponent, setActiveComponent] = useState(null);
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [numTestCases, setNumTestCases] = useState('');
  const [outputDetails, setOutputDetails] = useState(null);
  const [outputDetailsTestCases, setOutputDetailsTestCases] = useState(null);  // For Test Cases
  const [processing, setProcessing] = useState(null);
  const [processingTestCases, setProcessingTestCases] = useState(null)  // For Test Cases
  const [question, setQuestion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [theme, setTheme] = useState("cobalt");
  const[answertest,setAnswerTest]=useState()
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hint, setHint] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);
  const handlePopup = async () => {
    setIsPopupOpen(true);
    setIsLoading(true);
   


    try {
      const response = await fetchHintFromChatGPT(code);
      setHint(response);
    } catch (error) {
      setHint("Failed to fetch hint. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchHintFromChatGPT = async (code) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your actual API key
    const apiUrl = "https://api.openai.com/v1/chat/completions";
  
    try {
      const response = await axios.post(
        apiUrl,
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an AI that provides coding hints.",
            },
            {
              role: "user",
              content: `Provide a hint for the following code:\n\n${code} for following question :\n\n${question} and don't evaluate the following function for the hint process_input_and_call_function , HINT should not be more than 3 lines`,
            },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      const hint = response.data.choices[0].message.content.trim();
      return hint;
    } catch (error) {
      console.error("Error fetching hint from ChatGPT:", error);
      throw error;
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setHint("");
  };
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
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

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

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
  
  let testCaseJsonResult={
    correctanswer:0,
    totaltestcases:0,
  }
  
  useEffect(() => {
    if (questionId) {
      fetchDocumentData(questionId);
    }
  }, [questionId]);

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
      source_code: btoa(code),  // encode source code in base64
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
        let status = err.response.status;  // get error status
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
          checkStatusCustomInput(token,expectedoutput);
        }, 2000);
        return;
      } else {
        setProcessingTestCases(false);

        let decodedOutput = atob(response.data.stdout).replace(/\s+/g, '');
        console.log("before checking",expectedoutput)
        let cleanedExpectedOutput = (expectedoutput ||"")
    
        if (decodedOutput == cleanedExpectedOutput) {
            console.log('I am in');
            console.log('correctanswer');
            testCaseJsonResult.correctanswer++;
            setAnswerTest(testCaseJsonResult.correctanswer)
            console.log("testCaseJsonResult",testCaseJsonResult)
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
      let status = err.response ? err.response.status : "Unknown";  // get error status
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
    console.log(testCases)
    const promises = testCases.map(testCase => {
      const input = testCase.input
      const expectedOutput = testCase.output
      console.log(input);
      console.log("Output", expectedOutput)
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
  <div className="flex flex-row justify-between">
    <div className="flex flex-row">
      <div className="px-4 py-2">
      {language && <LanguagesDropdownCustom onSelectChange={onSelectChange} defaultValue={language} />}
      </div>
      <div className="px-4 py-2">
        <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
      </div>
      
    </div>
    <div>
    <button
            onClick={handlePopup}
            disabled={!code}
            className={classnames(
              "mr-5 mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
              !code ? "opacity-50" : ""
            )}
          >
            Hint AI
          </button>
          <Link to="/compete">
          <button
            onClick={handlePopup}
            disabled={!code}
            className={classnames(
              "mr-5 mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
              !code ? "opacity-50" : ""
            )}
          >
            Compete Dashboard
            
          </button>
          </Link>
    
    </div>
     
  </div>
  <Popup isOpen={isPopupOpen} onClose={closePopup} isLoading={isLoading} heading={"Hint AI"}>
        <p>{hint}</p>
      </Popup>

  <div className="flex flex-row px-4 py-4 space-x-4">
    {/* Left Side: QuestionCustom */}
    <div className="w-1/2">
      <QuestionCustom question={question} />
    </div>

    {/* Right Side: CodeEditorWindow and OutputWindow */}
    <div className="w-1/2 flex flex-col space-y-4 mt-9">
      {language && (
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language={language?.value}
          theme={theme.value}
        />
      )}

      <div className="right-container flex flex-col">
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

          {/* Button for comparing Test Cases with output */}
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
        <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
        <OutputWindow outputDetails={outputDetails} /> 

        


        
        {/* Conditional rendering of output details */}
        {activeComponent === 'outputDetails' && outputDetails && (
          <OutputDetails outputDetails={outputDetails} />
        )}
 {showComponent && activeComponent === 'outputTestCases' && outputDetailsTestCases && (
        <OutputDetailsTestCases outputDetailsTestCases={outputDetailsTestCases} correctanswer={answertest}/>
      )}
      </div>
    </div>
  </div>
</>

  );
};

export default Coding;
