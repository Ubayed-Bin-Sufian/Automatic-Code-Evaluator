import React from "react";
import { useNavigate } from "react-router-dom";

const Question1 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>            
            <p>Question-1: What is the mean (average) of the following set of numbers: 4, 8, 15, 16, 23, 42?</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question1;
