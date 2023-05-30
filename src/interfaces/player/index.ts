import { DevelopmentGoalInterface } from 'interfaces/development-goal';
import { PerformanceDataInterface } from 'interfaces/performance-data';
import { TrainingPlanInterface } from 'interfaces/training-plan';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  team_id: string;
  parent_id?: string;
  development_goal?: DevelopmentGoalInterface[];
  performance_data?: PerformanceDataInterface[];
  training_plan?: TrainingPlanInterface[];
  user_player_user_idTouser?: UserInterface;
  team?: TeamInterface;
  user_player_parent_idTouser?: UserInterface;
  _count?: {
    development_goal?: number;
    performance_data?: number;
    training_plan?: number;
  };
}
