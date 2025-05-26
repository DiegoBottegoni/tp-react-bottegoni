import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";


function LogOutButton() {
    const { setLoggedIn } = useContext(CartContext);

    const handleLogout = () => {
        // Simular logout
        setLoggedIn(false);
    };

    return (
        <div>
            <button className="btn btn-error" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default LogOutButton