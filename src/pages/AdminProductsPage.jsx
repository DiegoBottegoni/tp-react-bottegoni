import ProductList from "../components/ProductList";

function AdminProductsPage() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
            <ProductList admin />
        </div>
    );
}

export default AdminProductsPage;
