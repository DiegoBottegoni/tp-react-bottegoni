import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Carrito</h2>

            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="border p-4 rounded shadow flex flex-col gap-2"
                            >
                                <div className="font-semibold">{item.title}</div>

                                <div className="flex items-center gap-2">
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => addToCart(item)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-sm">
                                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                <button
                                    className="btn btn-sm btn-error self-end"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Eliminar producto
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 text-right text-lg font-bold">
                        Total: ${cartItems
                            .reduce((acc, item) => acc + item.price * item.quantity, 0)
                            .toFixed(2)}
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
