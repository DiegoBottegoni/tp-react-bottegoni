import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import { authRoutesProtection } from "../src/middleware/authRoutesProtection";
import ProductForm from "./pages/ProductForm";
import ProductEdit from "./pages/ProductEdit";



const ProtectedCart = authRoutesProtection(CartPage);
const ProtectedCreateProduct = authRoutesProtection(ProductForm);
const ProtectedEditProduct = authRoutesProtection(ProductEdit);


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
          <Route path="products/:id/edit" element={<ProductEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
