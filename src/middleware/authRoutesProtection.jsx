import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useAuth = () => {
    const { loggedIn } = useContext(CartContext);
    return { loggedIn };
};
export const authRoutesProtection = (Component) => {
    return (props) => {
        const { loggedIn } = useAuth();

        if (!loggedIn) {
            return <div className="text-center text-red-500">Acceso denegado. Por favor, inicia sesión.</div>;
        }

        return <Component {...props} />;
    };
};
export default authRoutesProtection;