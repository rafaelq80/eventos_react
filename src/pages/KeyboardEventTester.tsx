import { useKeyboardEvents } from "../hooks/useKeyboardEvents";
import type { EventLog } from "../types/Types";

/**
 * Componente/página para testar e visualizar eventos de teclado.
 * Utiliza o hook useKeyboardEvents para capturar e exibir logs, valor do input e contador de eventos.
 * Permite limpar o log de eventos e o campo de input.
 */
export const KeyboardEventTester: React.FC = () => {
  const {
    keyboardCount,
    inputValue,
    events,
    keyboardAreaRef,
    clearEvents,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
    handleBlur,
    handleInputChange
  } = useKeyboardEvents();

  /**
   * Componente principal de teste de eventos de teclado.
   * Renderiza um input interativo, contador, log e botão de limpeza.
   */
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="font-rubik text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-5 border-b-4 border-blue-500 dark:border-blue-300 pb-3">
        ⌨️ Eventos do Teclado
      </h2>

      <div className="space-y-4">
        <input
          ref={keyboardAreaRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full h-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-4 border-gray-300 dark:border-gray-600 rounded-lg text-lg text-center px-4 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-500/30 transition-all duration-300 placeholder-gray-500 dark:placeholder-white"
          placeholder="Digite algo aqui para testar eventos do teclado..."
        />

        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Experimente também: ESC, F1, Ctrl+S (funciona globalmente)
        </div>
      </div>

      <div className="mt-6 mb-4 text-center">
        <div className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold">
          {keyboardCount} Eventos Capturados
        </div>
      </div>

      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm">
        {events.map((event: EventLog) => (
          <div
            key={event.id}
            className="mb-2 p-2 rounded-lg animate-fade-in bg-blue-900/50 border-l-4 border-blue-500"
          >
            <strong>[{event.timestamp}]</strong> {event.eventName} {event.details}
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            Nenhum evento capturado ainda. Comece a digitar!
          </div>
        )}
      </div>

      <button
        onClick={clearEvents}
        className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md"
      >
        🗑️ Limpar Log
      </button>
    </div>
  );
};
