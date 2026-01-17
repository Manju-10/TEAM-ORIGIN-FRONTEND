import { Routes, Route } from "react-router-dom";

import Intro from "./components/Intro";
import Register from "./components/Register";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sign_in" element={<SignIn />} />
    </Routes>
  );
}

export default App;
