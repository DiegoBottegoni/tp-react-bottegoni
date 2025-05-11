import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Carrito</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
