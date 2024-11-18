import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Homepage from "./pages/HomePage";
import UserRegister from "./pages/user-reg-page";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
            <Route path="/" element={<UserRegister />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
