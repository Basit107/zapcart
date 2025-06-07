import React, { useState } from "react";
import upload_area from "../assets/upload_area.svg";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import api from "../config/axios.js";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    public_id: "",
    category: "mobile",
    new_price: "",
    old_price: "",
    available: true,
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    const res = await api.post("v1/admins/upload", formData)

    if (res.data.success) {
      console.log("Image Uploaded Successfully: ", res.data.image_url);
      product.image = res.data.image_url;
      product.public_id = res.data.public_id;
      await api.post("v1/admins/add-product", product)
        .then((res) => res.data)
        .then((data) =>
          data.success
            ? alert("Product Has Been Added")
            : alert("Failed To Add Product")
        );  
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Add New Product</h3>
      <div className="mb-3">
        <label className="form-label">Product Title</label>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          className="form-control"
          placeholder="Type here"
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Old Price</label>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            className="form-control"
            placeholder="Old Price"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Offer Price</label>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            className="form-control"
            placeholder="New Price"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Product Category</label>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="form-select"
        >
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
          <option value="accessory">Accessory</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="file-input" className="form-label">
          Upload Image
        </label>
        <div className="border p-3 d-inline-block rounded">
          <label htmlFor="file-input" style={{ cursor: "pointer" }}>
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="upload"
              className="img-thumbnail"
              style={{ height: "150px", width: "auto" }}
            />
          </label>
        </div>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={Add_Product} className="btn btn-primary">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
