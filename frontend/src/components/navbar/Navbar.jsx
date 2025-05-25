import React, { useContext, useRef, useState } from 'react'
import './navbar.css'
import logo from '../assets/cart_icon.png'
import cart_icon from '../assets/cart_cross.png'
import { Link } from 'react-router-dom';
import { HomeContext } from '../../context/HomeContext';
import dropdown_icon from '../assets/nav_dropdown.png'


const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const {getTotalCartitems} = useContext(HomeContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>ZapCart</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => {setMenu("home")}}><Link style={{textDecoration: 'none', color: "black"}} to="/">Home</Link> {menu==="home"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("mobile")}}><Link style={{textDecoration: 'none', color: "black"}} to ="/mobile">Mobile Phones</Link>{menu==="mobile"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("tablets")}}><Link style={{textDecoration: 'none', color: "black"}} to="/tablets">Tablets</Link> {menu==="tablets"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("accessories")}}><Link style={{textDecoration: 'none', color: "black"}} to="/accessories">Accessories</Link> {menu==="accessories"?<hr/>:<></>}</li>
            </ul>

            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ? <button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to="/login"><button>Login</button></Link>}
                <div className="nav-cart-wrapper">
                    <Link to="/cart"><img src={cart_icon} alt=''/></Link>
                    <div className="nav-cart-count">{getTotalCartitems()}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar