import React from "react";
import { useNavigate } from "react-router-dom";

const Question1 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>
            <h1>Question - 1</h1>
            <p>Question 1 is displayed here</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question1;
