import React from "react";

const OutputDetailsTestCases = ({ outputDetailsTestCases }) => {
  console.log('Output:',outputDetailsTestCases)
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Total Test Cases:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {/* The ?. (optional chaining) ensures that if outputDetailsTestCases is null or undefined, it won't cause an error.
          totaltestcases is the property being accessed from the outputDetailsTestCases object. */}
          {outputDetailsTestCases?.totaltestcases}
        </span>
      </p>
      <p className="text-sm">
        Correct Test Cases:{" "}
        <span className="font-semibold text-green-500 px-2 py-1 rounded-md bg-gray-100">
          {outputDetailsTestCases?.correcttestcases}
        </span>
      </p>
    </div>
  );
};

export default OutputDetailsTestCases;
