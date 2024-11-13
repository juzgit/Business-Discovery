import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
