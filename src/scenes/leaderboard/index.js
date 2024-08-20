import React, { useState, useEffect } from 'react';

// Mock JSON data with time values (in seconds)
const mockData = [
  { name: 'Alice', time: 120.5 },
  { name: 'Bob', time: 110.0 },
  { name: 'Charlie', time: 130.0 },
  { name: 'David', time: 105.5 },
];

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sort the mock data by time in ascending order and assign ranks
    const sortedData = [...mockData]
      .sort((a, b) => a.time - b.time)
      .map((item, index) => ({ ...item, rank: index + 1 }));
    setData(sortedData);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-25">
      <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{item.rank}</td>
              <td className="py-2 px-4 border-b text-center">{item.name}</td>
              <td className="py-2 px-4 border-b text-center">{item.time.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
