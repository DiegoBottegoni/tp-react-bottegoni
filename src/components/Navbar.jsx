import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
    const { cartItems } = useContext(CartContext);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className=" px-6 py-4 flex items-center justify-between">
            {/* Links a la izquierda */}
            <div className="flex gap-6 items-center">
                <Link to="/" className="hover:text-primary font-semibold">Inicio</Link>
                <Link to="/products" className="hover:text-primary font-semibold">Productos</Link>
            </div>

            {/* Carrito + Theme switch a la derecha */}
            <div className="flex items-center gap-4">
                {/* Theme controller */}
                <label className="swap swap-rotate">
                    <input
                        type="checkbox"
                        className="theme-controller"
                        value="dark"
                    />

                    {/* Sun (light mode) */}
                    <svg
                        className="swap-off w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </g>
                    </svg>

                    {/* Moon (dark mode) */}
                    <svg
                        className="swap-on w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </g>
                    </svg>
                </label>


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
