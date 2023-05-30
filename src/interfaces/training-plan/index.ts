import { UserInterface } from 'interfaces/user';
import { PlayerInterface } from 'interfaces/player';

export interface TrainingPlanInterface {
  id?: string;
  coach_id: string;
  player_id: string;
  plan: string;

  user?: UserInterface;
  player?: PlayerInterface;
  _count?: {};
}
