import React, { useEffect, useState } from "react";
import api from "../../config/axios.js";
import ProductForm from "./ProductForm"; 

const ProductUpdateModal = ({ show, handleClose, product, refreshProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        old_price: product.old_price || "",
        new_price: product.new_price || "",
        category: product.category || "",
        image: product.image || "",
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Form Data:", formData);

    try {
      const res = await api.put(`/v1/admins/product/${product.id}`, formData);

      if (res.status === 200) {
        console.log("Product updated!");
        refreshProducts(); // Refresh the product list
        handleClose(); // Close the modal
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data?.message || err.message);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block show"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4 shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title">Update Product</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body d-flex">
            {/* Image on Left */}
            <div className="me-4" style={{ flex: "0 0 40%" }}>
              {formData && <img
                src={formData.image || "https://via.placeholder.com/300"}
                alt="Product"
                className="img-fluid rounded"
                style={{ objectFit: "cover", maxHeight: "300px" }}
              /> }
            </div>

            {/* Form on Right */}
            <form style={{ flex: 1 }} onSubmit={handleSubmit}>
              <ProductForm formData={formData} setFormData={setFormData} />

              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary ms-2"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdateModal;
