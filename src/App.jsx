import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ProductEdit from "./components/ProductEdit";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/edit-product/:id" element={<ProductEdit />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
