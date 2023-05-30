import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';

export interface EventInterface {
  id?: string;
  team_id: string;
  coach_id: string;
  event_type: string;
  event_date: Date;

  team?: TeamInterface;
  user?: UserInterface;
  _count?: {};
}
