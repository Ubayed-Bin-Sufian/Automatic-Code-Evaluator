import React, { useEffect, useState } from 'react';
import contestsData from '../../data/codingChallenge.json';
import codingGif from '../../components/images/Coding.gif'; // Update this path to your GIF
import { Link } from 'react-router-dom';

const Contest = () => {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setContests(contestsData);
    // Simulate loading time for the GIF
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100">
      {isLoading ? (
        <div className="text-4xl font-bold text-gray-600 mb-8 mt-1164px">Loading...</div>
      ) : (
        <img
          src={codingGif}
          alt="Coding Contest"
          className="w-full max-w-3xl mb-8 rounded-lg shadow-2xl"
        />
      )}
      <h2 className="text-6xl font-bold text-gray-600 mb-8">Running Contest</h2>
      <div className="overflow-x-auto w-full max-w-7xl">
        <table className="w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-8 py-4 text-2xl font-semibold">Code</th>
              <th className="px-8 py-4 text-2xl font-semibold">Name</th>
              <th className="px-8 py-4 text-2xl font-semibold">Coding Problem</th>
              <th className="px-8 py-4 text-2xl font-semibold">Start</th>
              <th className="px-8 py-4 text-2xl font-semibold">Duration</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr 
                key={contest.code} 
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="border-b border-gray-200 px-8 py-4 text-xl">
                  <div 
                    to={`/problem/${contest.code}`} 
                    className="text-blue-500 hover:text-blue-800 hover:underline font-medium"
                  >
                    {contest.code}
                  </div>
                </td>
                <td className="border-b border-gray-200 px-8 py-4 text-xl">{contest.name}</td>
                <td className="border-b border-gray-200 px-8 py-4 text-xl">
                  <Link 
                    to={contest.codingProblem.link} 
                    className="text-blue-500 hover:text-blue-800 hover:underline font-medium"
                  >
                    {contest.codingProblem.name}
                  </Link>
                </td>
                <td className="border-b border-gray-200 px-8 py-4 text-xl">{formatDate(contest.start)}</td>
                <td className="border-b border-gray-200 px-8 py-4 text-xl">{contest.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contest;