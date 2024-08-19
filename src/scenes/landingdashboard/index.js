import React from "react";

import Dashboard from "../../components/Dashboard";
import CodingCards from "../../components/CodingCards";
const LandingDashboard = () => {
  return (
    <div>
      
      <main className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Dashboard/>
        <CodingCards/>
        {/* Your other components go here */}
      </main>
    </div>
  );
};

export default LandingDashboard;