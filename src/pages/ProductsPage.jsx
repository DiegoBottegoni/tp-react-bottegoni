import ProductList from "../components/ProductList";
import { Helmet } from "react-helmet";

function ProductsPage() {
    return (
        <div>
            <Helmet>
                <title>Productos | TP React</title>
                <meta name="description" content="Lista de productos disponibles en TP React" />
            </Helmet>
            <h1 className="text-2xl font-bold my-4 text-center">Nuestros productos</h1>
            <ProductList />
        </div>
    );
}

export default ProductsPage;
