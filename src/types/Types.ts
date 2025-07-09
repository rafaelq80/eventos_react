export interface EventLog {
  id: number;
  timestamp: string;
  eventName: string;
  details: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
}