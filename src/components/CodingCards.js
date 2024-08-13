import React from "react";
import { FaPython, FaJs, FaJava } from "react-icons/fa"; // Import icons for different languages


const mockData = [
  {
    id: 1,
    icon: <FaPython className="text-blue-500 text-4xl" />,
    title: "Learn Python",
    description: "Master Python with interactive lessons and challenges.",
  },
  {
    id: 2,
    icon: <FaJs className="text-yellow-500 text-4xl" />,
    title: "JavaScript Essentials",
    description: "Learn the fundamentals of JavaScript, the language of the web.",
  },
  {
    id: 3,
    icon: <FaJava className="text-red-500 text-4xl" />,
    title: "Java for Beginners",
    description: "Get started with Java and build your first applications.",
  },
  {
    id: 4,
    icon: <FaPython className="text-blue-500 text-4xl" />,
    title: "Advanced Python",
    description: "Take your Python skills to the next level with advanced concepts.",
  },
  {
    id: 5,
    icon: <FaJs className="text-yellow-500 text-4xl" />,
    title: "JavaScript Frameworks",
    description: "Explore popular JavaScript frameworks like React and Angular.",
  },
  {
    id: 6,
    icon: <FaJava className="text-red-500 text-4xl" />,
    title: "Java Enterprise",
    description: "Learn about Java in enterprise applications.",
  },
];

const CodingCards = () => {
  return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 md:mt-24 px-4 md:px-8">
  {mockData.map((card) => (
    <div
      key={card.id}
      className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition duration-300 ease-in-out flex flex-col justify-between"
      style={{ width: '100%', height: '400px' }} // Adjust the height as needed
    >
      <div>
        <div className="flex items-center mb-6">
          <div className="text-3xl">{card.icon}</div>
          <h2 className="ml-4 text-2xl font-bold text-gray-900">{card.title}</h2>
        </div>
        <p className="text-gray-700 text-lg mb-8">{card.description}</p>
      </div>
      <button className="mt-auto px-6 py-3 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300">
        Get Started
      </button>
    </div>
  ))}
</div>
  );
};

export default CodingCards;
