import React from "react";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="relative sidebar bg-light mt-lg-7 vh-100" style={{ width: "250px", height: "100vh" }}>
      <ul className="nav flex-column p-3">
      <li className="nav-item mb-2">
        <h4 className="text-center">Admin Panel</h4>
      </li>
      <Link to="/admin/addproduct" className=" position-relative d-flex mt-4 mb-4 text-decoration-none text-dark">
        <img src={add_product_icon} alt="Add" className="me-2" width="24" />
        Add Product
      </Link>
      <Link to="/admin/listproduct" className="d-block text-decoration-none text-dark">
        <img src={list_product_icon} alt="List" className="me-2" width="24" />
        Product List
      </Link>
      </ul>
      <div className="bottom-0 start-0 align-bottom w-100 fixed-rounded-bottom-5 py-3">
        <p className="text-secondary mb-0">© 2025 zapcart</p>
      </div>
    </div>
  );
};

export default Sidebar;
// This code defines a sidebar component for an admin panel application.
// It includes links to add a product and view the product list, with icons for each link.