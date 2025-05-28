import React from "react";
import './footer.css'
import logo from '../assets/cart_icon.png'
import instagram_icon from '../assets/instagram_icon.png'
import whatsapp_icon from '../assets/whatsapp_icon.png'
import linkedin_icon from '../assets/linkedin_icon.png'



const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="" />
                <p>ZapCart</p>
            </div>
            <ul className="footer-links">
                <li>About</li>
                <li>Contact</li>
                <li>Company</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-social-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-social-icons-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
                <div className="footer-social-icons-container">
                    <img src={linkedin_icon} alt="" />
                </div>
            </div>
            <div className="copyright">
                <hr />
                <p>&copy; All Rights Reservered by ABDUL BASIT </p>
            </div>
        </div>
    )
}

export default Footer