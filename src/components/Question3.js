import React from "react";
import { useNavigate } from "react-router-dom";

const Question3 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>
            <p>Question - 3: How do you find the mode of the following set of numbers: 1, 2, 2, 3, 4, 4, 4, 5?</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question3;
