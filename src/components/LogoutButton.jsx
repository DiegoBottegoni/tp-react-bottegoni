import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function LogOutButton() {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        // Simular logout
        logout();
    };

    return (
        <div>
            <button className="btn btn-error" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default LogOutButton