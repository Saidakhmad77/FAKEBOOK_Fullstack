import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import Error from "./components/Error.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar></NavBar>
     <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/error" element={<Error></Error>}></Route>
      <Route></Route>
     </Routes>
    
    </BrowserRouter>

    </>
  )
}

export default App
