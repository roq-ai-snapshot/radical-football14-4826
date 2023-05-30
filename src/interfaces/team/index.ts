import { EventInterface } from 'interfaces/event';
import { PlayerInterface } from 'interfaces/player';
import { AcademyInterface } from 'interfaces/academy';
import { UserInterface } from 'interfaces/user';

export interface TeamInterface {
  id?: string;
  name: string;
  academy_id: string;
  coach_id: string;
  event?: EventInterface[];
  player?: PlayerInterface[];
  academy?: AcademyInterface;
  user?: UserInterface;
  _count?: {
    event?: number;
    player?: number;
  };
}
