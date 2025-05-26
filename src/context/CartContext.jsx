import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    // Fetch de productos manejado en el contexto
    useEffect(() => {
        setIsLoading(true);
        fetch("https://fakestoreapi.com/products")
            .then((res) => {
                if (!res.ok) throw new Error("Error en la API");
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, []);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
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
                cartItems, // Elementos del carrito
                isLoading, // Estado de carga
                error, // Manejo de errores
                products, // Productos están disponibles globalmente
                loggedIn, // Estado de autenticación
                setLoggedIn, // Permite cambiar el estado de loggedIn
                addToCart, // Función para agregar productos al carrito
                decreaseQuantity, // Función para disminuir la cantidad de un producto en el carrito
                removeFromCart, // Función para eliminar un producto del carrito
                clearCart // Función para limpiar el carrito
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
