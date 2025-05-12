import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductList() {
    const { products, isLoading, error, addToCart } = useContext(CartContext);

    if (isLoading) {
        return <span className="loading loading-spinner text-primary"></span>;
    }

    if (error) {
        return <p className="text-error">Error: {error}</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="card shadow-sm w-full">
                    <Link to={`/products/${product.id}`} className="flex flex-col h-full">
                        <figure>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-48 object-contain"
                            />
                        </figure>
                        <div className="card-body flex-1">
                            <h2 className="card-title text-base">{product.title}</h2>
                            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                            <p className="font-bold text-lg">${product.price}</p>
                        </div>
                    </Link>
                    <div className="card-actions justify-end p-4 pt-0">
                        <button
                            onClick={() => addToCart(product)}
                            className="btn btn-primary btn-sm"
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
