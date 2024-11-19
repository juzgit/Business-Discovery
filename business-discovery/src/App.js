import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Homepage from "./startPages/HomePage";
//import UserRegister from "./startPages/user-reg-page";
//import UserLogin from "./startPages/user-login-page";
//import BusinessRegister from "./startPages/business-reg-page";
import BusinessLogin from "./startPages/business-login-page";

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
