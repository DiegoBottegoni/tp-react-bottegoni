import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Carrito</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id} className="mb-4 border-b pb-2">
                            <p className="font-semibold">{item.title}</p>
                            <p>${item.price}</p>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Quitar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
