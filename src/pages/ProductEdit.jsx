import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

function ProductEdit() {
    const { fetchProducts } = useContext(CartContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://686bf84314219674dcc6c89e.mockapi.io/api/v1/products/products/${id}`)
            .then((res) => setForm(res.data))
            .catch(() => toast.error("Error al obtener el producto"))
            .finally(() => setLoading(false));
    }, [id]);

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "El título es obligatorio.";
        if (!form.price || Number(form.price) <= 0) newErrors.price = "El precio debe ser mayor a 0.";
        if (!form.description || form.description.length < 10)
            newErrors.description = "La descripción debe tener al menos 10 caracteres.";
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.put(`https://686bf84314219674dcc6c89e.mockapi.io/api/v1/products/products/${id}`, {
                ...form,
                price: Number(form.price)
            });

            toast.success("Producto actualizado");
            await fetchProducts();
            navigate("/products");
        } catch {
            toast.error("Error al actualizar el producto");
        }
    };

    if (loading) return <p className="text-center">Cargando producto...</p>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block font-semibold">Título</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                <div className="mb-3">
                    <label className="block font-semibold">Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div className="mb-3">
                    <label className="block font-semibold">Descripción</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div className="mb-3">
                    <label className="block font-semibold">Categoría</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="mb-3">
                    <label className="block font-semibold">Imagen (URL)</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">Actualizar</button>
            </form>
        </div>
    );
}

export default ProductEdit;
