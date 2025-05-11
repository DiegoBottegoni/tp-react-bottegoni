import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Todas las rutas van dentro del layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
