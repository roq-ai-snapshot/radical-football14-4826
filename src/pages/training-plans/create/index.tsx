import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createTrainingPlan } from 'apiSdk/training-plans';
import { Error } from 'components/error';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { getPlayers } from 'apiSdk/players';
import { TrainingPlanInterface } from 'interfaces/training-plan';

function TrainingPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrainingPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrainingPlan(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrainingPlanInterface>({
    initialValues: {
      coach_id: '',
      plan: '',
      player_id: (router.query.player_id as string) ?? null,
    },
    validationSchema: trainingPlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Training Plan
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="coach_id" mb="4" isInvalid={!!formik.errors?.coach_id}>
            <FormLabel>Coach</FormLabel>
            <Input type="text" name="coach_id" value={formik.values?.coach_id} onChange={formik.handleChange} />
            {formik.errors.coach_id && <FormErrorMessage>{formik.errors?.coach_id}</FormErrorMessage>}
          </FormControl>
          <FormControl id="plan" mb="4" isInvalid={!!formik.errors?.plan}>
            <FormLabel>Plan</FormLabel>
            <Input type="text" name="plan" value={formik.values?.plan} onChange={formik.handleChange} />
            {formik.errors.plan && <FormErrorMessage>{formik.errors?.plan}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.user_id}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_plan',
  operation: AccessOperationEnum.CREATE,
})(TrainingPlanCreatePage);
