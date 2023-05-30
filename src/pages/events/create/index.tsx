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
import { createEvent } from 'apiSdk/events';
import { Error } from 'components/error';
import { eventValidationSchema } from 'validationSchema/events';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeamInterface } from 'interfaces/team';
import { getTeams } from 'apiSdk/teams';
import { EventInterface } from 'interfaces/event';

function EventCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EventInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEvent(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EventInterface>({
    initialValues: {
      coach_id: '',
      event_type: '',
      event_date: new Date(new Date().toDateString()),
      team_id: (router.query.team_id as string) ?? null,
    },
    validationSchema: eventValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Event
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="coach_id" mb="4" isInvalid={!!formik.errors?.coach_id}>
            <FormLabel>Coach</FormLabel>
            <Input type="text" name="coach_id" value={formik.values?.coach_id} onChange={formik.handleChange} />
            {formik.errors.coach_id && <FormErrorMessage>{formik.errors?.coach_id}</FormErrorMessage>}
          </FormControl>
          <FormControl id="event_type" mb="4" isInvalid={!!formik.errors?.event_type}>
            <FormLabel>Event Type</FormLabel>
            <Input type="text" name="event_type" value={formik.values?.event_type} onChange={formik.handleChange} />
            {formik.errors.event_type && <FormErrorMessage>{formik.errors?.event_type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="event_date" mb="4">
            <FormLabel>Event Date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.event_date}
              onChange={(value: Date) => formik.setFieldValue('event_date', value)}
            />
          </FormControl>
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team_id'}
            label={'Team'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.name}
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
  entity: 'event',
  operation: AccessOperationEnum.CREATE,
})(EventCreatePage);
