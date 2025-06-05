// src/components/modals/ProductForm.jsx
import React from "react";

const ProductForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Old Price</label>
          <input
            type="number"
            name="old_price"
            className="form-control"
            value={formData.old_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 col">
          <label className="form-label">New Price</label>
          <input
            type="number"
            name="new_price"
            className="form-control"
            value={formData.new_price}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Category <span className="text-muted">(not editable)</span></label>
        <input type="hidden" name="category" value={formData.category} />
        <select
          className="form-select text-muted bg-light"
          name="category"
          value={formData.category}
          disabled
        >
          <option value={formData.category}>{formData.category}</option>
        </select>
      </div>
    </>
  );
};

export default ProductForm;
