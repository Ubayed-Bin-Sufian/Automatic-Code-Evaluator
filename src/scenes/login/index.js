import React, { useContext, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { UserContext } from '../../lib/context';
import { signIn } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is authenticated, redirect to /compete
    if (user) {
      navigate('/compete');
    }
  }, [user, navigate]);

  const handleClick = async () => {
    if (!user) {
      await signIn();
      console.log("comming form handle")
      navigate('/compete'); // Redirect to /compete after successful login
    }
  };

  return (
    <>
      
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-16 rounded-2xl shadow-2xl text-center w-full max-w-3xl">
          <h2 className="text-4xl font-extrabold text-gray-700 mb-10">
            Welcome to Coding Platform
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Get started by logging in or signing up with your Google account
          </p>
          <button
            onClick={handleClick}
            className="flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out text-lg font-semibold w-full max-w-md mx-auto"
          >
            <FaGoogle className="text-2xl mr-4" />
            <span>Login/Signup using Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
