import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ProductApp
        </Link>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-product">
                Add Product
              </NavLink>
            </li>
          </ul>

          <div>
            {isAuthenticated ? (
              <>
                <span className="text-light me-2">{user?.name}</span>
                <button className="btn btn-light btn-sm" type="button" onClick={handleLogout}>
                  Sign out
                </button>
              </>
            ) : (
              <Link className="btn btn-light btn-sm" to="/login">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
