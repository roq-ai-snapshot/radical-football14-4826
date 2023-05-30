import { PlayerInterface } from 'interfaces/player';

export interface DevelopmentGoalInterface {
  id?: string;
  player_id: string;
  goal: string;

  player?: PlayerInterface;
  _count?: {};
}
