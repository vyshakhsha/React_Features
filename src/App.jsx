import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Landing";
import Filter from "./Components/Filter";
import InfiniteScrollCmp from "./Components/InfiniteScroll";
import File from "./Components/File";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/InfiniteScroll" element={<InfiniteScrollCmp />} />
        <Route path="/file" element={<File/>}/>
      </Routes>
    </>
  );
}

export default App;
