import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png";
import api from "../config/axios.js"

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch(`${API_BASE_URL}/api/v1/products/allproducts`)
      .then((response) => response.json())
      .then((data) => setAllProducts(data));
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
                <td>{product.name}</td>
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
    </div>
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