import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductList() {
    const { products, isLoading, error, addToCart } = useContext(CartContext);

    if (isLoading) return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
    if (error) return <p className="text-error text-center mt-8">Error al cargar la lista de productos: {error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="card shadow-md rounded-lg overflow-hidden flex flex-col bg-base-300">
                        <Link to={`/products/${product.id}`} className="flex-1">
                            <figure className=" p-4 h-48 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-h-full object-contain"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-base">{product.title}</h2>
                                <p className="text-sm  line-clamp-2">{product.description}</p>
                                <p className="font-bold text-lg">${product.price}</p>
                            </div>
                        </Link>
                        <div className="card-actions justify-end px-4 pb-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="btn btn-primary-content btn-sm"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
