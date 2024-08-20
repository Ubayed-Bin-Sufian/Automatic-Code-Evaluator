import React from "react";
import { useNavigate } from "react-router-dom";

const PopupWithButton = ({ isOpen, onClose, isLoading, children, heading, isButton,questionId }) => {
  const navigate = useNavigate(); // Hook for navigation

  if (!isOpen) return null;

  const handleNavigate = () => {
    navigate(`/leaderboard/${questionId}`); // Navigate to /leaderboard
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{heading}</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-red-500 transition duration-200"
          >
            &times;
          </button>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="text-lg"> {/* Adjusted the text size here */}
              {children}
            </div>
          )}
        </div>
        {isButton && ( // Show button only if isButton is true
          <div className="mt-4">
            <button
              onClick={handleNavigate}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 px-4 py-2 rounded"
            >
              Go to Leaderboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupWithButton;
