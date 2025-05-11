import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div>
            <h2 className="text-xl font-bold">{product.title}</h2>
            <img src={product.image} alt={product.title} className="w-40 my-4" />
            <p>{product.description}</p>
            <p className="font-semibold">${product.price}</p>
        </div>
    );
}

export default ProductDetail;
