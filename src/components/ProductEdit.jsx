import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearSingleProduct,
  getProduct,
  updateProduct,
} from "../features/products/productsSlice";

const getProductForm = (product) => ({
  title: product.title || "",
  price: product.price || "",
  image: product.image || "",
  category: product.category || "",
  description: product.description || "",
  userEmail: product.userEmail || "",
  userName: product.userName || "",
});

const ProductEditForm = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(getProductForm(product));
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
      updateProduct({
        ...formData,
        id: product.id,
        price: Number(formData.price),
      }),
    ).unwrap();

    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border p-4">
            <h1 className="h4 mb-4">Edit Product</h1>

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

              <button className="btn btn-primary me-2" type="submit">
                Edit Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { product, loading, error } = useSelector((state) => state.products);
  const isSameProduct = useMemo(() => String(product?.id) === String(id), [id, product]);

  useEffect(() => {
    dispatch(getProduct(id));

    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, id]);

  if (loading) {
    return <div className="alert alert-info">Loading product...</div>;
  }

  if (error || !product || !isSameProduct) {
    return (
      <div className="border p-4">
        <h1 className="h5">Product not found</h1>
        <p className="text-muted">The product may have been deleted or the link is incorrect.</p>
        <Link className="btn btn-primary" to="/">
          Back to Products
        </Link>
      </div>
    );
  }

  if (product.userEmail !== user?.email) {
    return (
      <div className="border p-4">
        <h1 className="h5">Access denied</h1>
        <p className="text-muted">You can edit only products that you added.</p>
        <Link className="btn btn-primary" to="/">
          Back to Products
        </Link>
      </div>
    );
  }

  return <ProductEditForm key={product.id} product={product} />;
};

export default ProductEdit;
