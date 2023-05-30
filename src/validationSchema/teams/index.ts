import * as yup from 'yup';
import { eventValidationSchema } from 'validationSchema/events';
import { playerValidationSchema } from 'validationSchema/players';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  academy_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
  event: yup.array().of(eventValidationSchema),
  player: yup.array().of(playerValidationSchema),
});
