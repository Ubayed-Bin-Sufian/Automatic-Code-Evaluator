// Library Imports
import { Routes, Route, useLocation } from "react-router-dom";

// Custom Imports
import "./App.css";
import Coding from "./scenes/codingeditor";
import Contest from "./scenes/contest/Contest";
import Form from "./scenes/form";
import LandingDashboard from "./scenes/landingdashboard";
import Leaderboard from "./scenes/leaderboard";
import Login from "./scenes/login";
import Navbar from "./components/Navbar";
import { UserProvider } from "./lib/context";

function App() {
  const location = useLocation();
  const isQuestionRoute = location.pathname.startsWith('/question/');

return(
    <UserProvider>
      {!isQuestionRoute && <Navbar />} {/* Render Navbar only if not on question route */}
      <Routes>
        <Route path="/" element={<LandingDashboard />} />
        <Route path="/compete" element={<Contest />} />
        <Route path="/admin" element={<Form />} />
        <Route path="/question/:questionId" element={<Coding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </UserProvider>
  );  
}

export default App;
