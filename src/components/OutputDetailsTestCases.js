import React from "react";

const OutputDetailsTestCases = ({ OutputDetailsTestCases }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold text-green-500 px-2 py-1 rounded-md bg-gray-100">
          {OutputDetailsTestCases?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {OutputDetailsTestCases?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {OutputDetailsTestCases?.time}s
        </span>
      </p>
    </div>
  );
};

export default OutputDetailsTestCases;
