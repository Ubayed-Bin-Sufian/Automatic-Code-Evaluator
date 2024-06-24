import React from "react";
import { useNavigate } from "react-router-dom";

const Question4 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>
            <h1>Question - 4</h1>
            <p>Question 4 is displayed here</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question4;
