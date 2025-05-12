import { useEffect, useState } from "react";

function ThemeSwitch() {
    const [isDark, setIsDark] = useState(false);

    // Al montar, leer el theme guardado
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const isDarkTheme = savedTheme === "dark";
        setIsDark(isDarkTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        setIsDark(!isDark);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                checked={isDark}
                onChange={toggleTheme}
            />

            {/* Sun (light mode) */}
            <svg
                className="swap-off w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
            </svg>

            {/* Moon (dark mode) */}
            <svg
                className="swap-on w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
            </svg>
        </label>
    );
}

export default ThemeSwitch;
