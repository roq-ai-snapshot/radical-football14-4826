import * as yup from 'yup';

export const developmentGoalValidationSchema = yup.object().shape({
  goal: yup.string().required(),
  player_id: yup.string().nullable().required(),
});
