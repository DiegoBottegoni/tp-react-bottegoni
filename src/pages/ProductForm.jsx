import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProductForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "El título es obligatorio.";
        if (!form.price || Number(form.price) <= 0) newErrors.price = "El precio debe ser mayor a 0.";
        if (!form.description || form.description.length < 10)
            newErrors.description = "La descripción debe tener al menos 10 caracteres.";
        if (!form.category.trim()) newErrors.category = "La categoría es obligatoria.";
        if (!form.image.trim()) newErrors.image = "La URL de la imagen es obligatoria.";
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
            await axios.post("https://686bf84314219674dcc6c89e.mockapi.io/api/v1/products/products", {
                ...form,
                price: Number(form.price),
                rating: {
                    rate: 0,
                    count: 0
                }
            });
            toast.success("Producto creado con éxito");
            navigate("/products");
        } catch (err) {
            toast.error("Error al crear el producto");
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
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
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>

                <div className="mb-3">
                    <label className="block font-semibold">URL de Imagen</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </div>

                <button type="submit" className="btn btn-primary w-full">Crear</button>
            </form>
        </div>
    );
}

export default ProductForm;
