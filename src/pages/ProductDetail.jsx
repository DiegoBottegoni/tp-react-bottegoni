import { useParams } from "react-router-dom";
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
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex justify-center mt-10">
            <div className="card bg-base-100 w-96 shadow-sm">
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
                        <div className="badge badge-secondary">{product.category}</div>
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
