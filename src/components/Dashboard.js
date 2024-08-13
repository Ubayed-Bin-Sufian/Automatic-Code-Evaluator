import React from "react";
import codingguy from "./images/codingguy.png"; // Replace with your image path

const Dashboard = () => {
  return (
<div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-16 px-4 md:px-8">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Your Coding Journey Starts Here
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mt-6">
          Unlock your potential with personalized learning paths and challenges.
        </p>
        <button className="mt-8 px-6 py-3 text-lg md:text-xl font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Sign Up Now
        </button>
      </div>
      <div className="md:w-2/3">
        <img
          src={codingguy} // Replace with your image path
          alt="Coding journey illustration"
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Dashboard;
