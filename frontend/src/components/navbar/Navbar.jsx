import React, { useContext, useRef, useState } from 'react';
import logo from '../assets/cart_icon.png';
import cart_icon from '../assets/cart_cross.png';
import { Link } from 'react-router-dom';
import { HomeContext } from '../../context/HomeContext';
import dropdown_icon from '../assets/nav_dropdown.png';
import {useAuth} from '../../context/AuthContext'

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartitems } = useContext(HomeContext);
    const menuRef = useRef();
    const {isLoggedIn, logout} = useAuth();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('d-flex');
        e.target.classList.toggle('rotate-90');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm border-bottom px-3 px-md-4 py-2">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                    <span className="fs-4 fw-bold text-dark">ZapCart</span>
                </div>

                <img 
                    src={dropdown_icon} 
                    alt="dropdown" 
                    className="d-lg-none d-block" 
                    style={{ width: "30px", cursor: "pointer", transition: "0.4s" }} 
                    onClick={dropdown_toggle} 
                />

                <ul 
                    ref={menuRef} 
                    className="navbar-nav flex-lg-row flex-column align-items-lg-center gap-2 mt-lg-0 mt-2 d-none d-lg-flex"
                >
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Mobile Phones', path: '/mobile' },
                        { name: 'Tablets', path: '/tablets' },
                        { name: 'Accessories', path: '/accessories' },
                    ].map((item) => (
                        <li key={item.name} className="nav-item px-2">
                            <Link 
                                to={item.path} 
                                className={`nav-link fw-medium ${menu === item.name.toLowerCase() ? 'text-primary border-bottom border-2 border-primary' : 'text-dark'}`}
                                onClick={() => setMenu(item.name.toLowerCase())}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="d-flex align-items-center gap-3">
                    {isLoggedIn ? (
                        <button className="btn btn-primary" onClick={logout}>
                        Logout
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}

                    <div className="position-relative">
                        <Link to="/cart">
                            <img src={cart_icon} alt="cart" width="40" height="40" />
                        </Link>
                        <span 
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                            style={{ fontSize: '0.7rem' }}
                        >
                            {getTotalCartitems()}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
