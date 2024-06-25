import React from "react";
import { useNavigate } from "react-router-dom";

const Question2 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>            
            <p>Question - 2: What is the median of the numbers 1, 3, 3, 6, 7, 8, 9?</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question2;
