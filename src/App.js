import "./App.css";
import Landing from "./components/Landing";
import Form from "./scenes/form";
import LandingDashboard from "./scenes/landingdashboard";
import Coding from "./scenes/codingeditor";
import { Routes, Route,useLocation } from "react-router-dom";
import Login from "./scenes/Login";
import Contest from "./scenes/contest/Contest";
import { UserProvider } from "./lib/context";
import Navbar from "./components/Navbar";
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
      </Routes>
    </UserProvider>
);
  
}

export default App;
