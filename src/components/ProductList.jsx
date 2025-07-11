import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PRODUCTS_PER_PAGE = 6;

function ProductList({ admin = false }) {
    const { products, isLoading, error, addToCart, removeProductById } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
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

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Lógica de paginación
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
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

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre o categoría"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // volver a página 1 si cambia el filtro
                    }}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
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

            {/* Paginador */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm"
                    >
                        ← Anterior
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-ghost"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm"
                    >
                        Siguiente →
                    </button>
                </div>
            )}

            {/* Modal de confirmación */}
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
