// Importación de hooks integrados de React
import { useEffect, useState, useContext } from "react";
// Importación del contexto creado para manejo del carrito en toda la aplicación
import { CartContext } from "../context/CartContext";

function ProductList() {
    // Primera instancia de productos declarada como estado, inicialmente vacía
    const [products, setProducts] = useState([]);
    // Función "traída" del contexto para añadir productos al carrito
    const { addToCart } = useContext(CartContext);
    // Llamada a la API para obtener el listado de productos, dentro de useEffect para evitar llamadas innecesarias
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data)) // Se setea la lista vacía con la información traida de la API
            .catch((err) => console.error("Error fetching products:", err));
    }, []);
    // En el retorno del componente, se mapea el array que primero declaramos vacío como estado
    // Array que en la llamada a la API lo "llenamos" de productos
    // Se lo mapea con el id como key para renderear cada producto
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
