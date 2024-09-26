import { Link } from "react-router-dom";
import "./NavBar.css";


function NavBar() {
    return (
        <div className="navbar-container">
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/error" className="nav-link">Error</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;