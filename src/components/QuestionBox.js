import React, { useRef, useEffect } from "react";
import { classnames } from "../utils/general";

const QuestionBox = ({ question }) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      // Set the inner text directly to preserve formatting
      divRef.current.textContent = question || "Question is displayed here";
    }
  }, [question]);

  return (
    <div className="w-full max">
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Question
      </h1>

      <div
        ref={divRef}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
        style={{
          minHeight: "6em",
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          overflowY: "hidden",
          fontSize: "18px", // Set the font size to 12px
        }}
      ></div>
    </div>
  );
};

export default QuestionBox;
