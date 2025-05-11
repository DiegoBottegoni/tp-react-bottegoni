import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div>
            {products.map((product) => (
                <div key={product.id} className="mb-6">
                    <p>{product.title}</p>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                    >
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
