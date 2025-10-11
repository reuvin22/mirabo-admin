import Layout from "./components/Layout";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
