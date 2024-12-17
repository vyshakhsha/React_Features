import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Landing";
import Filter from "./Components/Filter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Filter" element={<Filter />} />
      </Routes>
    </>
  );
}

export default App;
