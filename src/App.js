import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./quiz";
import Result from "./result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;