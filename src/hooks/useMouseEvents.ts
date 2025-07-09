import { useState, useRef } from "react";
import type { EventLog, Coordinates, ClickEffect } from "../types/Types";

interface UseMouseEventsReturn {
  mouseCount: number;
  coordinates: Coordinates;
  isDragging: boolean;
  clickEffects: ClickEffect[];
  events: EventLog[];
  mouseAreaRef: React.RefObject<HTMLDivElement | null>;
  clearEvents: () => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
}

/**
 * Função auxiliar para registrar eventos no log e incrementar o contador.
 */
function logEvent(
  setEvents: React.Dispatch<React.SetStateAction<EventLog[]>>,
  setMouseCount: React.Dispatch<React.SetStateAction<number>>,
  eventName: string,
  details: string = ''
) {
  const timestamp = new Date().toLocaleTimeString();
  const newEvent: EventLog = {
    id: Date.now() + Math.random(),
    timestamp,
    eventName,
    details
  };
  setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
  setMouseCount(prev => prev + 1);
}

/**
 * Função auxiliar para criar efeito visual de clique.
 */
function createClickEffect(
  setClickEffects: React.Dispatch<React.SetStateAction<ClickEffect[]>>,
  x: number,
  y: number
) {
  const effect: ClickEffect = {
    id: Date.now() + Math.random(),
    x: x - 10,
    y: y - 10
  };
  setClickEffects(prev => [...prev, effect]);
  setTimeout(() => {
    setClickEffects(prev => prev.filter(e => e.id !== effect.id));
  }, 600);
}

/**
 * Função auxiliar para obter o nome do botão do mouse.
 */
function getMouseButton(button: number): string {
  switch(button) {
    case 0: return 'Esquerdo';
    case 1: return 'Meio';
    case 2: return 'Direito';
    default: return 'Desconhecido';
  }
}

/**
 * Hook personalizado para capturar e gerenciar eventos do mouse em uma área específica.
 * Fornece logs, coordenadas, efeitos visuais de clique e utilitários para manipulação de eventos.
 * @returns {UseMouseEventsReturn} Objeto com estados, ref, handlers e utilitários para eventos do mouse.
 */
export const useMouseEvents = (): UseMouseEventsReturn => {
  const [mouseCount, setMouseCount] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [events, setEvents] = useState<EventLog[]>([]);
  const mouseAreaRef = useRef<HTMLDivElement>(null);

  /**
   * Limpa o log de eventos e o contador de eventos do mouse.
   * Adiciona um evento de sistema indicando a limpeza.
   */
  const clearEvents = (): void => {
    setEvents([]);
    setMouseCount(0);
    logEvent(setEvents, setMouseCount, 'system', '- Log do mouse limpo');
  };

  /**
   * Handler para movimento do mouse dentro da área.
   * Atualiza as coordenadas e loga o evento se estiver arrastando.
   * @param {React.MouseEvent<HTMLDivElement>} e Evento do mouse
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!mouseAreaRef.current) return;
    const rect = mouseAreaRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoordinates({ x, y });
    if (isDragging) {
      logEvent(setEvents, setMouseCount, 'mousemove', `- Arrastando em (${x}, ${y})`);
    }
  };

  /**
   * Handler para entrada do mouse na área.
   * Loga o evento de entrada.
   */
  const handleMouseEnter = (): void => {
    logEvent(setEvents, setMouseCount, 'mouseenter', '- Mouse entrou na área');
  };

  /**
   * Handler para saída do mouse da área.
   * Loga o evento de saída e encerra o arrasto.
   */
  const handleMouseLeave = (): void => {
    logEvent(setEvents, setMouseCount, 'mouseleave', '- Mouse saiu da área');
    setIsDragging(false);
  };

  /**
   * Handler para pressionar botão do mouse.
   * Cria efeito visual, loga o evento e inicia arrasto.
   * @param {React.MouseEvent<HTMLDivElement>} e Evento do mouse
   */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    const rect = mouseAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    createClickEffect(setClickEffects, x, y);
    logEvent(setEvents, setMouseCount, 'mousedown', `- Botão ${getMouseButton(e.button)} pressionado em (${x}, ${y})`);
  };

  /**
   * Handler para soltar botão do mouse.
   * Loga o evento e encerra arrasto.
   * @param {React.MouseEvent<HTMLDivElement>} e Evento do mouse
   */
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(false);
    const rect = mouseAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    logEvent(setEvents, setMouseCount, 'mouseup', `- Botão ${getMouseButton(e.button)} solto em (${x}, ${y})`);
  };

  /**
   * Handler para clique do mouse.
   * Loga o evento de clique.
   * @param {React.MouseEvent<HTMLDivElement>} e Evento do mouse
   */
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = mouseAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    logEvent(setEvents, setMouseCount, 'click', `- Clique em (${x}, ${y})`);
  };

  /**
   * Handler para duplo clique do mouse.
   * Loga o evento de duplo clique.
   * @param {React.MouseEvent<HTMLDivElement>} e Evento do mouse
   */
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = mouseAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    logEvent(setEvents, setMouseCount, 'dblclick', `- Duplo clique em (${x}, ${y})`);
  };

  /**
   * Handler para menu de contexto (botão direito).
   * Previne o menu padrão e loga o evento.
   * @param {React.MouseEvent<HTMLDivElement>} e Evento do mouse
   */
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const rect = mouseAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    logEvent(setEvents, setMouseCount, 'contextmenu', `- Menu de contexto em (${x}, ${y})`);
  };

  /**
   * Handler para rolagem do mouse (scroll/wheel).
   * Previne o scroll padrão e loga a direção.
   * @param {React.WheelEvent<HTMLDivElement>} e Evento de rolagem
   */
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 'baixo' : 'cima';
    logEvent(setEvents, setMouseCount, 'wheel', `- Scroll para ${direction} (${e.deltaY})`);
  };

  return {
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
  };
};