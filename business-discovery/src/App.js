import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Homepage from "./pages/HomePage";
//import UserRegister from "./pages/user-reg-page";
//import UserLogin from "./pages/user-login-page";
//import BusinessRegister from "./pages/business-reg-page";
import BusinessLogin from "./pages/business-login-page";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
            <Route path="/" element={<BusinessLogin />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
