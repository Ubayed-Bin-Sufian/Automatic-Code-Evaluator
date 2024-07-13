import React from "react";

const OutputDetailsTestCases = ({ outputDetailsTestCases }) => {
  console.log('OUtputes',outputDetailsTestCases)
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Total test case:{" "}
        <span className="font-semibold text-green-500 px-2 py-1 rounded-md bg-gray-100">
          {outputDetailsTestCases?. totaltestcases}
        </span>
      </p>
      <p className="text-sm">
        Correct test case:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {outputDetailsTestCases?.correctanswer}
        </span>
      </p>
    </div>
  );
};

export default OutputDetailsTestCases;
