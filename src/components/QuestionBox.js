import React from "react";
import { classnames } from "../utils/general";

const QuestionBox = ({ question, setQuestion }) => {
  const questions = [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
  ];

  return (
    <div>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Question
      </h1>

      <select
        onChange={(e) => setQuestion(e.target.value)}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
      >
        {questions.map((q, index) => (
          <option key={index} value={q}>
            {q}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuestionBox;
