import { PlayerInterface } from 'interfaces/player';

export interface PerformanceDataInterface {
  id?: string;
  player_id: string;
  data: string;

  player?: PlayerInterface;
  _count?: {};
}
