import "./App.css";
import Landing from "./components/Landing";
import Form from "./scenes/form";
import LandingDashboard from "./scenes/landingdashboard";
import Coding from "./scenes/codingeditor";
import { Routes, Route } from "react-router-dom";
import GoogleLoginSignup from "./scenes/login";
function App() {
return(
  <Routes>
      <Route path="/" element={<LandingDashboard/>} />
      <Route path="/admin" element={<Form/>}/>
      <Route path="/question/:questionId" element={<Coding />} />
      <Route path="/login" element ={<GoogleLoginSignup/>}/>

   </Routes>
);
  
}

export default App;
