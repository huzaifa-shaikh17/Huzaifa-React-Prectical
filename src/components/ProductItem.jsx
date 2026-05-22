import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../features/products/productsSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isUserProduct = isAuthenticated && product.userEmail === user?.email;

  const handleDelete = () => {
    if (!isUserProduct) return;
    dispatch(deleteProduct(product.id));
  };

  return (
    <div className="col-lg-3">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.category}</p>
          <p className="card-text text-muted small">{product.description}</p>
          <p className="card-text mt-auto">
            Rs. {Number(product.price).toLocaleString("en-IN")}
          </p>
          {product.userName && (
            <p className="card-text small">Added by {product.userName}</p>
          )}
          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              type="button"
              onClick={() => navigate(`/edit-product/${product.id}`)}
              disabled={!isUserProduct}
              title={
                isUserProduct
                  ? "Edit product"
                  : "Only the user can edit this product"
              }
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={handleDelete}
              disabled={!isUserProduct}
              title={
                isUserProduct
                  ? "Delete product"
                  : "Only the user can delete this product"
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
