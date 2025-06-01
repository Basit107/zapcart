import React from "react";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="min-h-screen relative overflow-scroll sidebar bg-light" style={{ width: "250px", height: "100vh" }}>
      <Link to="/addproduct" className=" position-relative d-flex mt-4 mb-4 text-decoration-none text-dark">
        <img src={add_product_icon} alt="Add" className="me-2" width="24" />
        Add Product
      </Link>
      <Link to="/listproduct" className="d-block text-decoration-none text-dark">
        <img src={list_product_icon} alt="List" className="me-2" width="24" />
        Product List
      </Link>
    </div>
  );
};

export default Sidebar;
// This code defines a sidebar component for an admin panel application.
// It includes links to add a product and view the product list, with icons for each link.