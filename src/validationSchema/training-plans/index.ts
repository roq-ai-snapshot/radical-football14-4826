import * as yup from 'yup';

export const trainingPlanValidationSchema = yup.object().shape({
  plan: yup.string().required(),
  coach_id: yup.string().nullable().required(),
  player_id: yup.string().nullable().required(),
});
