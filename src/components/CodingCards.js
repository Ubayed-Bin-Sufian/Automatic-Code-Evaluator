import React from "react";
import { FaPython, FaJs, FaJava } from "react-icons/fa"; // Import icons for different languages
import { FaRProject } from "react-icons/fa";
import { TbBoxModel } from "react-icons/tb";
import { HiAdjustments } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
const mockData = [
  {
    id: 1,
    icon: <FaPython className="text-blue-500 text-4xl" />,
    title: "Learn Python and Data Structure",
    description: "Master Python with interactive lessons and challenges.",
    tutorial:"https://www.youtube.com/playlist?list=PLPTV0NXA_ZSgHj4a9CE1KLSarhkjocecO"
  },
  {
    id: 2,
    icon: <TbBoxModel className="text-yellow-500 text-4xl" />,
    title: "Neural Network form scratch",
    description: "Learn the fundamentals of NNFS and build NNFS from scratch.",
    tutorial:"https://flyvidesh.online/courses/nnfs-neural-network-from-scratch/"
  },
  {
    id: 3,
    icon: <HiAdjustments className="text-red-500 text-4xl" />,
    title: "Transformer",
    description: "Exploring Transformer Models Architecture.",
    tutorial:"https://www.youtube.com/playlist?list=PLPTV0NXA_ZSjs5Dz7FfPCzV3BKC7CtJU1"
  },
  {
    id: 4,
    icon: <FaRProject className="text-blue-500 text-4xl" />,
    title: "R MasterClass",
    description: "Take your R skills to the next level with .",
    tutorial:"https://www.youtube.com/playlist?list=PLPTV0NXA_ZSijzVRPXpKen9lM6ol1CTJe"
  },
  {
    id: 5,
    icon: <FaGithub className="text-black-500 text-4xl" />,
    title: "Git Github MasterClass",
    description: "Mastering Git and GitHub Fundamentals",
    tutorial:'https://flyvidesh.online/courses/git-github-masterclass/'
  },
  {
    id: 6,
    icon: <FaRobot className="text-purple-500 text-4xl" />,
    title: "AI Research Bootcamp",
    description: "AI Research Bootcamp for beginners",
    tutorial:'https://www.youtube.com/playlist?list=PLPTV0NXA_ZSggVHqwnOq3rk9NeE1Fi8bx'
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
