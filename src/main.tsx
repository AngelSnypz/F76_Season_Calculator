import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScoreCalc } from "./Pages/ScoreCalc/ScoreCalc.tsx";
import { Home } from "./Pages/Home/Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scoreCalc" element={<ScoreCalc />} />
        <Route path="/builder" element={<div>TODO Builder</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
