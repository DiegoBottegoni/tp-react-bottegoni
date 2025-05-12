import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="hero min-h-[calc(100vh-6rem)]">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">¡Bienvenido a la tienda!</h1>
                    <p className="py-6">
                        Descubrí productos increíbles al mejor precio. Comprá fácil, rápido y seguro. <br />
                        ¿Listo para empezar?
                    </p>
                    <button className="btn btn-primary-content" onClick={() => navigate('/products')}>
                        Ir a productos
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
