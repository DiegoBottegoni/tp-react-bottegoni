import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);

    const total = cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

            {cartItems.length === 0 ? (
                <p >No hay productos en el carrito.</p>
            ) : (
                <>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cartItems.map((item) => (
                            <li key={item.id} className="shadow-md rounded-lg overflow-hidden bg-base-300">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-contain p-4"
                                />
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg font-semibold line-clamp-2">{item.title}</h2>
                                    <p className="text-sm">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>

                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="btn btn-sm" onClick={() => addToCart(item)}>+</button>
                                    </div>

                                    <button
                                        className="btn btn-error btn-xs mt-2"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 flex justify-between items-center flex-wrap gap-4">
                        <div className="text-xl font-bold">Total: ${total}</div>
                        <button onClick={clearCart} className="btn btn-outline btn-error btn-sm">
                            Vaciar carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
