import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
// Mock JSON data with time values (in seconds)
const mockData = [
  { name: 'Alice', time: 120.5 },
  { name: 'Bob', time: 110.0 },
  { name: 'Charlie', time: 130.0 },
  { name: 'David', time: 105.5 },
];
const retrieveSubmissionsForQuestion = async (questionId) => {
    const leaderboardCollection = collection(db, 'Leaderboard', questionId, 'Submissions');
    const submissionsSnapshot = await getDocs(leaderboardCollection);
  
    const submissionsList = submissionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  
    return submissionsList;
  };
  
  const Leaderboard = () => {
    const [data, setData] = useState([]);
    const { questionId } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const submissions = await retrieveSubmissionsForQuestion(questionId);
          
          // Sort the data by time complexity (assuming it's stored as a numerical value)
          const sortedData = submissions
            .sort((a, b) => a.timeComplexity - b.timeComplexity)
            .map((item, index) => ({ ...item, rank: index + 1 }));
            
          setData(sortedData);
        } catch (error) {
          console.error("Error fetching leaderboard data:", error);
        }
      };
  
      fetchData();
    }, [questionId]);

  return (
    <div className="max-w-6xl mx-auto mt-36 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-600">Leaderboard</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-4 px-6 text-left">Rank</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-right">Time Complexity</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-lg">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className={`border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out
                  ${index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : index === 2 ? 'bg-orange-100' : ''}`}
              >
                <td className="py-4 px-6 text-left font-bold">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : item.rank}
                </td>
                <td className="py-4 px-6 text-left font-medium">{item.displayName}</td>
                <td className="py-4 px-6 text-right">{item.timeComplexity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;