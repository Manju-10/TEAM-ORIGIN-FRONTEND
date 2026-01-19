import { Routes, Route } from "react-router-dom";

import Intro from "./components/Intro";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/register" element={<Register />} />
      <Route path="/log_in" element={<Login />} />
    </Routes>
  );
}

export default App;
