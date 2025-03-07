import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Items from "./pages/Items";
import Calculator from "./pages/Calculator";
import WhatNumber from "./pages/WhatNumber";
import "@fontsource/roboto/400.css";
import "./main.css";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/what-number" element={<WhatNumber />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/users" element={<Users />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </>
  );
}

export default App;
