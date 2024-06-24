import React from "react";
import { useNavigate } from "react-router-dom";

const Question5 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>
            <h1>Question - 5</h1>
            <p>Question 5 is displayed here</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question5;
