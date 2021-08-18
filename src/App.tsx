import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Header from "./components/Header";
import Add from "./components/Add";
import Learn from "./components/Learn";

// Styles
import "./App.styles.css";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/add" />} />
        <Route path="/add" element={<Add />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  );
}
