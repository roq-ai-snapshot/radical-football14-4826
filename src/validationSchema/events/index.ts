import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  event_type: yup.string().required(),
  event_date: yup.date().required(),
  team_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
