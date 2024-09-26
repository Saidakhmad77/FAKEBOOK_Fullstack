import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import Error from "./components/Error.jsx";
import NavBar from "./components/NavBar.jsx";
import Logout from "./components/Logout.jsx"; 
import UserToken from "./components/UserToken.jsx";

function App() {
  const {token,  removeToken, setToken } = UserToken();
  return (
    <>
    <BrowserRouter>
    <NavBar></NavBar>
     <Routes>
      <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={<Login setToken={setToken} />}
            ></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/logout" element={<Logout></Logout>}></Route>
      <Route path="/error" element={<Error />}></Route>
      <Route></Route>
     </Routes>
    
    </BrowserRouter>

    </>
  )
}

export default App
