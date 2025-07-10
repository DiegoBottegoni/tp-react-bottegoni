import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import { authRoutesProtection } from "../src/middleware/authRoutesProtection";
import ProductForm from "./pages/ProductForm";
import ProductEdit from "./pages/ProductEdit";
import AdminProductsPage from "./pages/AdminProductsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Rutas protegidas
const ProtectedCart = authRoutesProtection(CartPage);
const ProtectedCreateProduct = authRoutesProtection(ProductForm);
const ProtectedEditProduct = authRoutesProtection(ProductEdit);
const ProtectedAdminProducts = authRoutesProtection(AdminProductsPage);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<ProtectedCart />} />
          <Route path="admin/create" element={<ProtectedCreateProduct />} />
          <Route path="products/:id/edit" element={<ProtectedEditProduct />} />
          <Route path="admin/products" element={<ProtectedAdminProducts />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
