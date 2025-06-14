import React from "react";
import navlogo from "../assets/nav-logo.svg";
import { ArrowBigDown, CircleUserRoundIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from '../config/axios.js'

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("v1/auth/admin/signout");
      navigate("/login")
    } catch (error) {
      console.error("Logout Failed: " + error.response?.data || error.message)
    }
  }

  return (
    <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center gap-4" href="#">
          <img src={navlogo} alt="Logo" height="40" />
        </a>
        {/* <img src={navProfile} alt="Profile" height="40" width="40" className="nav-profile rounded-circle" /> */}
        <div className="dropdown">
          <button
            className="btn dropdown-toggle d-flex align-items-center gap-2"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <CircleUserRoundIcon size={34} />
          </button>
          <ul className="dropdown-menu fs-6 " aria-labelledby="dropdownMenuButton" style={{ left: 'auto', right: 0, transform: 'translateX(-10%)' }}>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
