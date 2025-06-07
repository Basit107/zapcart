import React from "react";
import { Link, useLocation } from "react-router-dom";
import add_product_icon from "../assets/Product_Cart.svg";
import list_product_icon from "../assets/Product_list_icon.svg";
import { ChartNoAxesCombined } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
    <style>{`
      .custom-link {
        text-decoration: none;
      }

      .custom-link:hover {
        background-color:rgb(211, 217, 219);
        color: rgb(61, 64, 65) !important;
      }
    `}
    </style>
    <div className="relative sidebar bg-light mt-lg-7 vh-100" style={{ width: "250px", height: "100vh" }}>
      <ul className="nav flex-column p-3">
      <li className="nav-item mb-2">
        <h4 className="text-center">Admin Panel</h4>
      </li>
      <Link to="/admin/addproduct" className={`d-block mt-4 mb-4 text-decoration-none text-dark my-2 custom-link px-3 py-2 rounded
        ${location.pathname === "/admin/addproduct" ? "bg-primary text-white" : "text-dark sidebar-link"}`}>
        <img src={add_product_icon} alt="Add" className="me-2 my-1" width="24" />
        Add Product
      </Link>
      <Link to="/admin/listproduct" className={`d-block text-decoration-none text-dark my-2 custom-link px-3 py-2 rounded
        ${location.pathname === "/admin/listproduct" ? "bg-primary text-white" : "text-dark sidebar-link"}`}>
        <img src={list_product_icon} alt="List" className="me-2 my-1" width="24" />
        Product List
      </Link>
      <Link to="/admin/analytics" className={`d-block text-decoration-none text-dark my-3 custom-link px-3 py-2 rounded
        ${location.pathname === "/admin/analytics" ? "bg-primary text-white" : "text-dark sidebar-link"}`}>
        <ChartNoAxesCombined alt="list" className="me-2" size={28}/>
        Analytics
      </Link>
      </ul>
      <div className="bottom-0 start-0 align-bottom w-100 fixed-rounded-bottom-5 py-3">
        <p className="text-secondary mb-0">© 2025 zapcart</p>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
// This code defines a sidebar component for an admin panel application.
// It includes links to add a product and view the product list, with icons for each link.