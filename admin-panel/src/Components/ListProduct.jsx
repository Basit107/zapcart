import React, { useEffect, useState } from "react";
import cross_icon from "../assets/cross_icon.png";
import api from "../config/axios.js"
import ProductUpdateModal from "./modals/ProductUpdateModal.jsx";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchInfo = async () => {
    const res = await api.get("v1/products/allproducts");
    setAllProducts(res.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      const res = await api.delete(`v1/admins/product/${id}`)

      if (res.status === 200 || res.status === 204) {
        console.log('Product deleted successfully');
        await fetchInfo(); // Refresh product list or data
      } else {
        console.warn('Unexpected response:', res.status, res.data);
      }

    } catch (error) {
    console.error('Failed to delete product:', error.response?.data?.message || error.message);
    }
  };

  return (
    <>
    <style>
      {`
      .product-name {
        text-decoration: none;
      }
      .product-name:hover {
        text-decoration: underline !important;
      }
      `}
    </style>
    <div className="container mt-4">
      <h3>List of All Products</h3>
      <div className="table-responsive mt-3">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Old Price</th>
              <th>New Price</th>
              <th>Category</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allproducts.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={product.image}
                    alt="product"
                    style={{ height: "50px", objectFit: "contain" }}
                  />
                </td>
                <td className="product-name"
                  style={{ cursor: "pointer", color: "black", textDecoration: "none", fontSize: "24" }}
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                >
                  {product.name}
                </td>
                <td>${product.old_price}</td>
                <td>${product.new_price}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    onClick={() => remove_product(product.id)}
                    src={cross_icon}
                    alt="remove"
                    style={{ height: "20px", cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedProduct && (
        <ProductUpdateModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          product={selectedProduct}
          refreshProducts={fetchInfo} // So the table updates after edit
        />
      )}
      {allproducts.length === 0 && (
        <div className="text-center mt-4">
          <p>No products available.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default ListProduct;
//         <select
//           value={productDetails.category}
//           onChange={changeHandler}
//           name="category"
//           className="form-select"
//         >
//           <option value="mobile">Mobile</option>
//           <option value="tablet">Tablet</option>
//           <option value="accessory">Accessory</option>
//         </select>