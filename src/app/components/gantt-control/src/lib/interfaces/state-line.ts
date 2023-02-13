import { State } from './state';

export interface StateLine {
  id: string;
  texto: string;
  textColor?: string;
  textSize?: string;
  states: State[];
  height?: number;
}
