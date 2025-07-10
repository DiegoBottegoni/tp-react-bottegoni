import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProductList({ admin = false }) {
    const { products, isLoading, error, addToCart, removeProductById } = useContext(CartContext);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!productToDelete) return;
        setIsDeleting(true);
        try {
            await axios.delete(
                `https://686bf84314219674dcc6c89e.mockapi.io/api/v1/products/products/${productToDelete}`
            );
            removeProductById(productToDelete);
            toast.success("Producto eliminado");
        } catch {
            toast.error("Error al eliminar el producto");
        } finally {
            setIsDeleting(false);
            setProductToDelete(null);
        }
    };

    if (isLoading)
        return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
    if (error)
        return (
            <p className="text-error text-center mt-8">
                Error al cargar la lista de productos: {error}
            </p>
        );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Productos</h1>
                {admin && (
                    <Link to="/admin/create" className="btn btn-success btn-sm">
                        Agregar producto
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card shadow-md rounded-lg overflow-hidden flex flex-col bg-base-300"
                    >
                        <Link to={`/products/${product.id}`} className="flex-1">
                            <figure className="p-4 h-48 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-h-full object-contain"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-base">{product.title}</h2>
                                <p className="text-sm line-clamp-2">{product.description}</p>
                                <p className="font-bold text-lg">${product.price}</p>
                            </div>
                        </Link>

                        <div className="card-actions justify-between px-4 pb-4">
                            {!admin && (
                                <button
                                    onClick={() => addToCart(product)}
                                    className="btn btn-primary btn-sm"
                                >
                                    Agregar al carrito
                                </button>
                            )}
                            {admin && (
                                <div className="flex gap-2">
                                    <Link
                                        to={`/products/${product.id}/edit`}
                                        className="btn btn-info btn-sm"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => setProductToDelete(product.id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {productToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">¿Eliminar producto?</h3>
                        <p className="mb-4">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setProductToDelete(null)}
                                className="btn btn-ghost"
                                disabled={isDeleting}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-error"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Eliminando..." : "Eliminar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
