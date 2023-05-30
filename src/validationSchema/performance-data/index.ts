import * as yup from 'yup';

export const performanceDataValidationSchema = yup.object().shape({
  data: yup.string().required(),
  player_id: yup.string().nullable().required(),
});
