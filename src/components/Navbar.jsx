import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/cart">Carrito</Link>
        </nav>
    );
}

export default Navbar;
