import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Persistencia en localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoggedIn(true);
        }
    }, []);

    const login = () => {
        const fakeUser = {
            id: 1,
            name: "Diego",
            email: "diego@email.com"
        };
        setUser(fakeUser);
        setLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(fakeUser));
    };

    const logout = () => {
        setUser(null);
        setLoggedIn(false);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
