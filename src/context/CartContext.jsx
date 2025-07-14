import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    // Función reutilizable para obtener productos
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("https://686bf84314219674dcc6c89e.mockapi.io/api/v1/products/products");
            if (!res.ok) throw new Error("Error en la API");
            const data = await res.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Se llama automáticamente al montar el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    // const addToCart = (product) => {
    //     setCartItems((prev) => {
    //         const existing = prev.find((item) => item.id === product.id);
    //         if (existing) {
    //             return prev.map((item) =>
    //                 item.id === product.id
    //                     ? { ...item, quantity: item.quantity + 1 }
    //                     : item
    //             );
    //         }
    //         return [...prev, { ...product, quantity: 1 }];
    //     });
    // };
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                toast.info("Cantidad actualizada en el carrito");
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.success("Producto añadido al carrito");
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const clearCart = () => setCartItems([]);

    const decreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isLoading,
                error,
                products,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                fetchProducts
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
