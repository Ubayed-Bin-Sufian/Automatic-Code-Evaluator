import React from "react";
import { useNavigate } from "react-router-dom";

const Question2 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>
            <h1>Question - 2</h1>
            <p>Question 2 is displayed here</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question2;
