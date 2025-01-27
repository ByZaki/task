import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Items from "./pages/Items";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <>
      <h1>React router</h1>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/users" element={<Users />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </>
  );
}

export default App;
