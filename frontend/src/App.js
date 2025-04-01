import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Stats from "./components/Stats";
//import Navbar from "./components/Navbar"; // Only include if you have this component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Include Navbar only if you've created the component */}
        {/* <Navbar /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats/:shortUrl" element={<Stats />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
