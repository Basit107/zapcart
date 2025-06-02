import React from "react";
import Sidebar from "../Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../Components/AddProduct";
import ListProduct from "../Components/ListProduct";
import Navbar from "../Components/Navbar";
import { Navigate } from "react-router-dom";

const Admin = () => {

  return (
    <div className="d-flex">
      <Sidebar />
      <div className=" gap-4">
        <Navbar />
      </div>
        <div className="flex-grow-1 p-lg-4 p-md-3 mt-4 mx-5">
          <Routes>
            <Route index element={<Navigate to="listproduct" />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/listproduct' element={<ListProduct />} />
          </Routes>
        </div>
    </div>
  );
};

export default Admin;
// This code defines the main admin layout for an admin panel application.
// It includes a sidebar for navigation and routes for adding and listing products.