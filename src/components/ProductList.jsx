import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { getAllProducts } from "../features/products/productsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return ["all", ...new Set(items.map((product) => product.category).filter(Boolean))];
  }, [items]);

  const visibleProducts = useMemo(() => {
    return items
      .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((product) => category === "all" || product.category === category)
      .toSorted((first, second) => {
        if (sortOrder === "low-high") return Number(first.price) - Number(second.price);
        if (sortOrder === "high-low") return Number(second.price) - Number(first.price);
        return 0;
      });
  }, [items, searchTerm, category, sortOrder]);

  return (
    <section>
      <div className="border p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="search">
              Search
            </label>
            <input
              className="form-control"
              id="search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All" : item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="sort">
              Sort
            </label>
            <select
              className="form-select"
              id="sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="">Default</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading products...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && visibleProducts.length === 0 ? (
        <div className="border p-4">
          <h2 className="h5">No products found</h2>
          <p className="text-muted mb-0">Try changing the search, filter, or add a new product.</p>
        </div>
      ) : (
        <div className="row g-3">
          {visibleProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
