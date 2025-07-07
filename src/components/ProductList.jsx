import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProductList() {
    const { products, isLoading, error, addToCart } = useContext(CartContext);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("¿Estás seguro que querés eliminar este producto?");
        if (!confirmed) return;

        try {
            await axios.delete(`https://686bf84314219674dcc6c89e.mockapi.io/api/v1/products/products/${id}`);
            toast.success("Producto eliminado correctamente");
            // Opción: Recargar productos si estás manejando eso por contexto
        } catch (err) {
            toast.error("Error al eliminar el producto");
            console.error(err);
        }
    };

    if (isLoading) return <span className="loading loading-spinner text-primary mx-auto block mt-8"></span>;
    if (error) return <p className="text-error text-center mt-8">Error al cargar la lista de productos: {error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="card shadow-md rounded-lg overflow-hidden flex flex-col bg-base-300">
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
                            <button
                                onClick={() => addToCart(product)}
                                className="btn btn-primary-content btn-sm"
                            >
                                Agregar al carrito
                            </button>

                            <Link to={`/products/${product.id}/edit`}>
                                <button className="btn btn-outline btn-secondary btn-sm">Editar</button>
                            </Link>

                            <button
                                onClick={() => handleDelete(product.id)}
                                className="btn btn-outline btn-error btn-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
