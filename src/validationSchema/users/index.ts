import * as yup from 'yup';
import { academyValidationSchema } from 'validationSchema/academies';
import { communicationValidationSchema } from 'validationSchema/communications';
import { eventValidationSchema } from 'validationSchema/events';
import { playerValidationSchema } from 'validationSchema/players';
import { teamValidationSchema } from 'validationSchema/teams';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';

export const userValidationSchema = yup.object().shape({
  role: yup.string().required(),
  roq_user_id: yup.string(),
  tenant_id: yup.string(),
  academy: yup.array().of(academyValidationSchema),
  communication_communication_receiver_idTouser: yup.array().of(communicationValidationSchema),
  communication_communication_sender_idTouser: yup.array().of(communicationValidationSchema),
  event: yup.array().of(eventValidationSchema),
  player_player_parent_idTouser: yup.array().of(playerValidationSchema),
  player_player_user_idTouser: yup.array().of(playerValidationSchema),
  team: yup.array().of(teamValidationSchema),
  training_plan: yup.array().of(trainingPlanValidationSchema),
});
