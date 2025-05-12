import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error fetching product");
                return res.json();
            })
            .then((data) => setProduct(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error al cargar el producto: {error}</p>;

    return (
        <div className="flex flex-col items-center mt-10 relative">
            {/* Sticky container */}
            <div className="sticky top-0 z-10 w-full bg-base-100 p-2 flex justify-start">
                <Link
                    to="/products"
                    className="btn btn-sm bg-base-200 hover:bg-base-300"
                >
                    ← Volver a productos
                </Link>
            </div>

            <div className="card bg-base-300 w-96 shadow-sm mt-4">
                <figure>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-60 object-contain p-4"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {product.title}
                        <div className="badge badge-secondary whitespace-nowrap px-3">
                            {product.category}
                        </div>
                    </h2>
                    <p>{product.description}</p>
                    <div className="text-lg font-bold">${product.price}</div>
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(product)}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
