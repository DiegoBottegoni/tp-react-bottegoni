import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";


function Layout() {
    return (
        <div>
            <Helmet>
                <title>Inicio | TP React</title>
                <meta name="description" content="E-commerce educativo desarrollado en React" />
            </Helmet>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
