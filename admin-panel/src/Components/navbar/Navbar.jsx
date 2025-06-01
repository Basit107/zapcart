import React from "react";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <nav className="fixed-top left-0 w-full  navbar bg-white shadow-sm w-100 px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <img src={navlogo} alt="Logo" height="40" />
        </a>
        <img src={navProfile} alt="Profile" height="40" width="40" className="nav-profile rounded-circle" />
      </div>
    </nav>
  );
};

export default Navbar;
