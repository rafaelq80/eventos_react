import { useState, useEffect, useCallback } from "react";

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const temaSalvo = localStorage.getItem("theme");
    
    if (temaSalvo) {
      return temaSalvo === "dark";
    }
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      const html = document.documentElement;
      
      // Aplica/remove a classe e salva no localStorage
      html.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      
      return newMode;
    });
  }, []);

  // Sincroniza o estado inicial com o DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
}