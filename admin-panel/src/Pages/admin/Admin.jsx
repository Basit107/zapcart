import React from "react";
// import "./admin.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../Components/addproduct/AddProduct";
import ListProduct from "../../Components/listproduct/ListProduct";

const Admin = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
// This code defines the main admin layout for an admin panel application.
// It includes a sidebar for navigation and routes for adding and listing products.