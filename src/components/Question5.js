import React from "react";
import { useNavigate } from "react-router-dom";

const Question5 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>
            <p>Question - 5: What is a scatter plot and when would you use it?</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question5;
