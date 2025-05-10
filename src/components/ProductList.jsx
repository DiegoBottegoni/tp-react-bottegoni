import { useEffect, useState } from "react";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div>
            {products.map((product) => (
                <p key={product.id} className="mb-10">{product.title}</p>
            ))}
        </div>
    );
}

export default ProductList;
