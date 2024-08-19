import React from "react";

const Popup = ({ isOpen, onClose, isLoading, children,heading }) => {
  if (!isOpen) return null;

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
      </div>
    </div>
  );
};

export default Popup;
