import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const authRoutesProtection = (Component) => {
    return function ProtectedComponent(props) {
        const { loggedIn } = useContext(AuthContext);

        if (!loggedIn) {
            return (
                <div className="text-center text-red-500 mt-8">
                    Acceso denegado. Por favor, inicia sesión.
                </div>
            );
        }

        return <Component {...props} />;
    };
};
