import "./signin.css";
import {
  FaHome,
  FaKey,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Signinterface() {
  return (
    <div className="body">
      <div className="signin">
        <nav>
          <div>
            <img src="/vision-ui-logo.png" alt="Vision UI Logo" />
          </div>
          <div className="navlists">
            <ul>
              <li>
                <FaHome />
                <a href="#">DASHBOARD</a>
              </li>
              <li>
                <FaUser />
                <a href="#">PROFILE</a>
              </li>
              <li>
                <FaUserCircle /> <Link to="/login">SIGN IN</Link>
              </li>
              <li>
                <FaKey />
                <Link to="/signup">SIGN UP</Link>
              </li>
            </ul>
          </div>
          <button className="download-btn">Free Download</button>
        </nav>
        <div className="imageside"></div>
        <div className="formside"></div>
         <div className="footer1">
          <div className="year">@2025 Vision-UI</div>
          <ul className="lists">
            <li className="footer-list">Marketplace</li>
            <li className="footer-list">Blog</li>
            <li className="footer-list">License</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Signinterface;
