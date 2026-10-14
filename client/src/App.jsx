import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import FullPost from "./components/FullPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<CreatePost />} />
      <Route path="/posts/:id" element={<FullPost />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
