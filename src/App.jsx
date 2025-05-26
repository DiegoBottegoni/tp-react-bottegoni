import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import { authRoutesProtection } from "../src/middleware/authRoutesProtection";

const ProtectedCart = authRoutesProtection(CartPage);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<ProtectedCart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
