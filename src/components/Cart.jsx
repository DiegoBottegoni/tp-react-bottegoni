import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);

    const total = cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartItems.map((item) => (
                    <li key={item.id} className="card image-full bg-base-100 shadow-md">
                        <figure>
                            <img src={item.image} alt={item.title} className="object-cover w-full h-48" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.title}</h2>
                            <p className="text-sm">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>

                            <div className="flex items-center gap-2">
                                <button className="btn btn-sm" onClick={() => decreaseQuantity(item.id)}>
                                    -
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button className="btn btn-sm" onClick={() => addToCart(item)}>
                                    +
                                </button>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-sm btn-error" onClick={() => removeFromCart(item.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-10 text-right pr-4 text-lg font-bold">
                Total: ${total}
            </div>
            <button
                onClick={clearCart}
                className="btn btn-outline btn-error btn-sm mt-6"
            >
                Vaciar carrito
            </button>
        </>
    );
}

export default Cart;
