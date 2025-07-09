import { useMouseEvents } from "../hooks/useMouseEvents";
import type { ClickEffect, EventLog } from "../types/Types";
import MouseArea from "../components/MouseArea";

/**
 * Componente principal de teste de eventos do mouse.
 * Renderiza uma área interativa, contador, log e botão de limpeza.
 */
export const MouseEventTester: React.FC = () => {
  // Hook customizado para capturar e manipular eventos do mouse
  const {
    mouseCount,
    coordinates,
    isDragging,
    clickEffects,
    events,
    mouseAreaRef,
    clearEvents,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleDoubleClick,
    handleContextMenu,
    handleWheel
  } = useMouseEvents();

  return (
    // Container principal estilizado
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="font-rubik text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-5 border-b-4 border-blue-500 dark:border-blue-300 pb-3">
        🖱️ Eventos do Mouse
      </h2>

      {/* Área interativa que captura todos os eventos do mouse */}
      <MouseArea
        ref={mouseAreaRef}
        className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-lg text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-900 hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onWheel={handleWheel}
      >
        {/* Exibe as coordenadas atuais do mouse */}
        <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-mono">
          X: {coordinates.x}, Y: {coordinates.y}
        </div>

        {/* Mensagem de instrução e status de arrasto */}
        <div className="text-center">
          <div className="mb-2">Mova o mouse aqui, clique e arraste!</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {isDragging ? 'Arrastando...' : 'Aguardando interação'}
          </div>
        </div>

        {/* Efeitos visuais de clique */}
        {clickEffects.map((effect: ClickEffect) => (
          <div
            key={effect.id}
            className="absolute w-5 h-5 border-2 border-blue-500 rounded-full pointer-events-none animate-ping"
            style={{
              left: `${effect.x}px`,
              top: `${effect.y}px`,
              animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1)'
            }}
          />
        ))}
      </MouseArea>

      {/* Contador de eventos capturados */}
      <div className="mt-6 mb-4 text-center">
        <div className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold">
          {mouseCount} Eventos Capturados
        </div>
      </div>

      {/* Log dos eventos do mouse */}
      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm">
        {events.map((event: EventLog) => (
          <div
            key={event.id}
            className="mb-2 p-2 rounded-lg animate-fade-in bg-green-900/50 border-l-4 border-green-500"
          >
            <strong>[{event.timestamp}]</strong> {event.eventName} {event.details}
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            Nenhum evento capturado ainda. Comece a interagir com o mouse!
          </div>
        )}
      </div>

      {/* Botão para limpar o log de eventos */}
      <button
        onClick={clearEvents}
        className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md"
      >
        🗑️ Limpar Log
      </button>
    </div>
  );
};
