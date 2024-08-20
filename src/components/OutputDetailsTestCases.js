import React, { useState, useEffect } from "react";
import Popup from "./Popup/PopupWIthButton"; // Assuming Popup is in the same directory
import PopupWithButton from "./Popup/PopupWIthButton";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import { collection, getDocs, setDoc, doc, QueryConstraint } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
const OutputDetailsTestCases = ({ outputDetailsTestCases, correctanswer,solutionDetails,questionId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { user } = useContext(UserContext); // Get user from context
  console.log(solutionDetails)
  const isEqual = outputDetailsTestCases?.totaltestcases === correctanswer;
  const addSolutionToLeaderboard = async ( timeComplexity, questionId) => {
    if (user) {
      // Create a reference to the specific question's leaderboard
      const leaderboardCollection = collection(db, 'Leaderboard', questionId, 'Submissions');
      
      // Check if the collection exists and create it if not
      const submissionsSnapshot = await getDocs(leaderboardCollection);
  
      // Set the new document ID by incrementing the current count of submissions
      const newDocumentId = (submissionsSnapshot.size + 1).toString();
      
      // Add the new submission document
      await setDoc(doc(leaderboardCollection, newDocumentId), {
        displayName: user.displayName,
        timeComplexity: timeComplexity,
        timestamp: new Date() // Optional: Add a timestamp for sorting later
      });
  
      console.log("Document added to Leaderboard for question:", questionId, "with ID:", newDocumentId);
    } else {
      console.error("User not found");
    }
  };
  useEffect(() => {
    if (outputDetailsTestCases?.totaltestcases !== undefined) {
      if (isEqual) {
        setPopupMessage("Correct Answer!");
        setIsButton(true)
        addSolutionToLeaderboard(solutionDetails?.time,questionId);
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
      <PopupWithButton isOpen={isPopupOpen} onClose={handleClosePopup} isLoading={false} heading={"Submission"} isButton={isButton} questionId={questionId}>
        {popupMessage}
      </PopupWithButton>
    </div>
  );
};

export default OutputDetailsTestCases;
