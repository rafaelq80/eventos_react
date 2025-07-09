import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import useDarkMode from "../hooks/useDarkMode";
import { KeyboardEventTester } from "./KeyboardEventTester";
import { MouseEventTester } from "./MouseEventTester";

/**
 * Componente/página principal para navegação entre testes de eventos de teclado e mouse.
 * Exibe abas ou botões para alternar entre os testes e renderiza o componente correspondente.
 */
export const EventTestingApp: React.FC = () => {
 
  const { toggleDarkMode, isDarkMode } = useDarkMode();


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 dark:from-gray-900 dark:to-black p-5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="font-rubik text-4xl font-bold text-gray-700 dark:text-gray-100 drop-shadow-lg text-center">
                🖱️ Demonstração de Eventos Mouse e Teclado ⌨️
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl ml-4"
              aria-label="Alternar modo escuro"
            >
              {isDarkMode ? (
                <SunIcon className="w-6 h-6 text-yellow-500" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            {isDarkMode ? 'Modo Escuro Ativado' : 'Modo Claro Ativado'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <MouseEventTester />
          <KeyboardEventTester />
        </div>
      </div>
    </div>
  );
};