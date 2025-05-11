// Importación de hooks integrados de React
import { useEffect, useState, useContext } from "react";
// Importación del contexto creado para manejo del carrito en toda la aplicación
import { CartContext } from "../context/CartContext";
// Importación de Link para redirigir al detalle de producto
import { Link } from "react-router-dom";

function ProductList() {
    // Estado para almacenar los productos, inicialmente vacío
    const [products, setProducts] = useState([]);
    // Se trae la función addToCart desde el contexto global
    const { addToCart } = useContext(CartContext);

    // useEffect para llamar a la API al renderizar el componente
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())         // Se convierte la respuesta en JSON
            .then((data) => setProducts(data)) // Se guarda la data en el estado products
            .catch((err) => console.error("Error fetching products:", err)); // Se maneja el error en caso de que falle la petición
    }, []); // Solo se ejecuta una vez, al montarse el componente

    // Renderizado del listado de productos
    return (
        <div>
            {/* Se recorre el array de productos para mostrar cada uno */}
            {products.map((product) => (
                <div key={product.id} className="mb-6">
                    {/* El título del producto es un link que redirige al detalle usando el id */}
                    <Link
                        to={`/products/${product.id}`}
                        className="text-lg font-semibold text-blue-700 hover:underline"
                    >
                        {product.title}
                    </Link>
                    <br />
                    {/* Botón que ejecuta addToCart al hacer clic */}
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
