import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserNavBar from "./userPages/UserHeader";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
            <Route path="/" element={<UserNavBar />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
