import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import ThemeSwitch from "./ThemeSwitch";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogoutButton";

function Navbar() {
    const { cartItems } = useContext(CartContext);
    const { loggedIn: isLoggedIn } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="px-6 py-4 flex items-center justify-between border-b-2 border-base-300 relative">
            {/* Botón menú hamburguesa (mobile) */}
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="text-2xl">
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Links a la izquierda (desktop y mobile expanded) */}
            <div className={`flex-col lg:flex lg:flex-row lg:gap-6 items-start lg:items-center absolute lg:static top-full left-0 w-full lg:w-auto bg-base-100 lg:bg-transparent z-50 px-6 py-4 lg:p-0 ${menuOpen ? "flex" : "hidden"}`}>
                <Link to="/" className="hover:text-primary font-semibold" onClick={closeMenu}>Inicio</Link>
                <Link to="/products" className="hover:text-primary font-semibold" onClick={closeMenu}>Productos</Link>
                {isLoggedIn && (
                    <Link to="/admin/products" className="hover:text-primary font-semibold" onClick={closeMenu}>
                        Administrar Productos
                    </Link>
                )}
            </div>

            {/* Carrito + Theme switch + login/logout */}
            <div className="flex items-center gap-4">
                {isLoggedIn ? <LogOutButton /> : <LogInButton />}
                <ThemeSwitch />
                <div className="relative">
                    <Link to="/cart" className="hover:border-base-300 text-xl">
                        <FiShoppingCart />
                    </Link>
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {totalQuantity}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
