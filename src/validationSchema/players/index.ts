import * as yup from 'yup';
import { developmentGoalValidationSchema } from 'validationSchema/development-goals';
import { performanceDataValidationSchema } from 'validationSchema/performance-data';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';

export const playerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  team_id: yup.string().nullable().required(),
  parent_id: yup.string().nullable(),
  development_goal: yup.array().of(developmentGoalValidationSchema),
  performance_data: yup.array().of(performanceDataValidationSchema),
  training_plan: yup.array().of(trainingPlanValidationSchema),
});
