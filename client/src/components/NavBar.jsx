import { Link } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import UserToken from "./UserToken";
import Logout from "./Logout";


function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {token, removeToken, setToken } = UserToken();

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);
    return (
        <div className="navbar-container">
        <nav>
          <ul className="nav-list">
{/*             <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
{/*             <li className="nav-item">
              <Link to="/error" className="nav-link">Error</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            {isAuthenticated && <Logout removeToken={removeToken} />}
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;