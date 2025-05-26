import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ThemeSwitch from "./ThemeSwitch";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogoutButton";

function Navbar() {
    const { cartItems } = useContext(CartContext);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const isLoggedIn = useContext(CartContext).loggedIn;

    return (
        <nav className=" px-6 py-4 flex items-center justify-between border-b-2 border-base-300">
            {/* Links a la izquierda */}
            <div className="flex gap-6 items-center">
                <Link to="/" className="hover:text-primary font-semibold">Inicio</Link>
                <Link to="/products" className="hover:text-primary font-semibold">Productos</Link>
            </div>

            {/* Carrito + Theme switch a la derecha */}
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <LogOutButton />
                ) : (
                    <LogInButton />
                )}
                <ThemeSwitch />
                {/* Ícono del carrito */}
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
