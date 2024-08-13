import React, { useState, useEffect } from "react";
import Popup from "./Popup"; // Assuming Popup is in the same directory

const OutputDetailsTestCases = ({ outputDetailsTestCases, correctanswer }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const isEqual = outputDetailsTestCases?.totaltestcases === correctanswer;

  useEffect(() => {
    if (outputDetailsTestCases?.totaltestcases !== undefined) {
      if (isEqual) {
        setPopupMessage("Correct Answer!");
      } else {
        setPopupMessage("Wrong Code!");
      }
      setIsPopupOpen(true);
    }
  }, [isEqual, outputDetailsTestCases?.totaltestcases]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Total Test Cases:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetailsTestCases?.totaltestcases}
        </span>
      </p>
      <p className="text-sm">
        Correct Test Cases:{" "}
        <span className="font-semibold text-green-500 px-2 py-1 rounded-md bg-gray-100">
          {correctanswer}
        </span>
      </p>
      <p className="text-sm">
        Test Cases Match:{" "}
        <span
          className={`font-semibold px-2 py-1 rounded-md ${
            isEqual ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
          }`}
        >
          {isEqual ? "Yes" : "No"}
        </span>
      </p>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} isLoading={false} heading={"Submission"}>
        {popupMessage}
      </Popup>
    </div>
  );
};

export default OutputDetailsTestCases;
