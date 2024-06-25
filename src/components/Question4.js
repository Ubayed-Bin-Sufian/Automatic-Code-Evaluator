import React from "react";
import { useNavigate } from "react-router-dom";

const Question4 = () => {
  const navigate = useNavigate();
  return (
      <>
        <div>
            <p>Question - 4: What is a histogram and how is it used?</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>        
      </>
  );
};

export default Question4;
