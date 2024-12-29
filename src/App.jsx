import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Landing";
import Filter from "./Components/Filter";
import InfiniteScrollCmp from "./Components/InfiniteScroll";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/InfiniteScroll" element={<InfiniteScrollCmp />} />
      </Routes>
    </>
  );
}

export default App;
