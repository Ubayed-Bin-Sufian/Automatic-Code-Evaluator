import React from "react";
import { classnames } from "../utils/general";

const QuestionBox = ({ question, setQuestion }) => {
  return (
    <div>
        <h1>Questions</h1>
        <div
            contentEditable
            onInput={(e) => setQuestion(e.target.textContent)}
            placeholder="Question is displayed here"
            className={classnames(
              "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
            )}
            style={{ minHeight: "3em", maxHeight: "6em", overflowY: "auto" }}
        >
            {question || "Question is displayed here"}
        </div>
    </div>
  );
};

export default QuestionBox;
