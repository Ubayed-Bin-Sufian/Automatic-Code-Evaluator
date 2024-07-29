import "./App.css";
import Landing from "./components/Landing";
import Form from "./scenes/form";
import Coding from "./scenes/codingeditor";
import { Routes, Route } from "react-router-dom";
function App() {
return(
  <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<Form />}/>
      <Route path="/question/:questionId" element={<Coding />} />
   </Routes>
);
  
}

export default App;
