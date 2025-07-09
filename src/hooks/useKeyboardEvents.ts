import { useState, useRef, useEffect } from "react";
import type { EventLog } from "../types/Types";

interface UseKeyboardEventsReturn {
  keyboardCount: number;
  inputValue: string;
  events: EventLog[];
  keyboardAreaRef: React.RefObject<HTMLInputElement | null>;
  clearEvents: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Hook personalizado para capturar e gerenciar eventos de teclado em um input.
 * Fornece logs, valor do input, contador de eventos e utilitários para manipulação de eventos.
 * @returns {UseKeyboardEventsReturn} Objeto com estados, ref, handlers e utilitários para eventos de teclado.
 */
export const useKeyboardEvents = (): UseKeyboardEventsReturn => {
  const [keyboardCount, setKeyboardCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [events, setEvents] = useState<EventLog[]>([]);
  const keyboardAreaRef = useRef<HTMLInputElement>(null);

  const logEvent = (eventName: string, details: string = ''): void => {
    const timestamp = new Date().toLocaleTimeString();
    const newEvent: EventLog = {
      id: Date.now() + Math.random(),
      timestamp,
      eventName,
      details
    };

    setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
    setKeyboardCount(prev => prev + 1);
  };

  /**
   * Limpa o log de eventos, o contador e o valor do input.
   * Adiciona um evento de sistema indicando a limpeza.
   */
  const clearEvents = (): void => {
    setEvents([]);
    setKeyboardCount(0);
    setInputValue("");
    logEvent('system', '- Log do teclado limpo');
  };

  /**
   * Handler para pressionar tecla (keydown).
   * Loga o evento, incluindo modificadores.
   * @param {React.KeyboardEvent<HTMLInputElement>} e Evento de teclado
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const modifiers: string[] = [];
    if (e.ctrlKey) modifiers.push('Ctrl');
    if (e.altKey) modifiers.push('Alt');
    if (e.shiftKey) modifiers.push('Shift');
    if (e.metaKey) modifiers.push('Meta');
    
    const modifierStr = modifiers.length > 0 ? ` (${modifiers.join('+')})` : '';
    logEvent('keydown', `- Tecla "${e.key}" pressionada (código: ${e.code})${modifierStr}`);
  };

  /**
   * Handler para soltar tecla (keyup).
   * Loga o evento.
   * @param {React.KeyboardEvent<HTMLInputElement>} e Evento de teclado
   */
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    logEvent('keyup', `- Tecla "${e.key}" solta (código: ${e.code})`);
  };

  /**
   * Handler para pressionar caractere (keypress).
   * Loga o evento.
   * @param {React.KeyboardEvent<HTMLInputElement>} e Evento de teclado
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    logEvent('keypress', `- Caractere "${e.key}" digitado (código: ${e.key})`);
  };

  /**
   * Handler para foco no input.
   * Loga o evento de foco.
   */
  const handleFocus = (): void => {
    logEvent('focus', '- Campo de texto focado');
  };

  /**
   * Handler para perda de foco no input.
   * Loga o evento de blur.
   */
  const handleBlur = (): void => {
    logEvent('blur', '- Campo de texto perdeu foco');
  };

  /**
   * Handler para alteração do valor do input.
   * Atualiza o estado e loga o novo valor.
   * @param {React.ChangeEvent<HTMLInputElement>} e Evento de alteração
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    logEvent('input (onChange)', `- Conteúdo alterado: "${e.target.value}"`);
  };

  // Global keyboard events
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        logEvent('keydown', '- Tecla Escape pressionada');
      } else if (e.key === 'F1') {
        e.preventDefault();
        logEvent('keydown', '- Tecla F1 pressionada');
      } else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        logEvent('keydown', '- Atalho Ctrl+S pressionado');
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return {
    keyboardCount,
    inputValue,
    events,
    keyboardAreaRef,
    clearEvents,
    handleKeyDown,
    handleKeyUp,
    handleKeyPress,
    handleFocus,
    handleBlur,
    handleInputChange
  };
};