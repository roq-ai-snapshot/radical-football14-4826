import { AcademyInterface } from 'interfaces/academy';
import { CommunicationInterface } from 'interfaces/communication';
import { EventInterface } from 'interfaces/event';
import { PlayerInterface } from 'interfaces/player';
import { TeamInterface } from 'interfaces/team';
import { TrainingPlanInterface } from 'interfaces/training-plan';

export interface UserInterface {
  id?: string;
  role: string;
  roq_user_id?: string;
  tenant_id?: string;
  academy?: AcademyInterface[];
  communication_communication_receiver_idTouser?: CommunicationInterface[];
  communication_communication_sender_idTouser?: CommunicationInterface[];
  event?: EventInterface[];
  player_player_parent_idTouser?: PlayerInterface[];
  player_player_user_idTouser?: PlayerInterface[];
  team?: TeamInterface[];
  training_plan?: TrainingPlanInterface[];

  _count?: {
    academy?: number;
    communication_communication_receiver_idTouser?: number;
    communication_communication_sender_idTouser?: number;
    event?: number;
    player_player_parent_idTouser?: number;
    player_player_user_idTouser?: number;
    team?: number;
    training_plan?: number;
  };
}
