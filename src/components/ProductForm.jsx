import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../features/products/productsSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!formData.title.trim()) nextErrors.title = "Title is required.";
    if (!formData.price || Number(formData.price) <= 0) nextErrors.price = "Enter a valid price.";
    if (!formData.image.trim()) nextErrors.image = "Image URL is required.";
    if (!formData.category.trim()) nextErrors.category = "Category is required.";
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await dispatch(
      addProduct({
        ...formData,
        price: Number(formData.price),
        userEmail: user.email,
        userName: user.name,
      }),
    ).unwrap();

    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border p-4">
            <h1 className="h4 mb-4">Add Product</h1>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="price">
                  Price
                </label>
                <input
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="category">
                  Category
                </label>
                <input
                  className={`form-control ${errors.category ? "is-invalid" : ""}`}
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                />
                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image URL
                </label>
                <input
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
