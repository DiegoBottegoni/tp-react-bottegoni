import ProductList from "../components/ProductList";

function AdminProductsPage() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Panel de administración de productos</h1>
            <ProductList admin />
        </div>
    );
}

export default AdminProductsPage;
