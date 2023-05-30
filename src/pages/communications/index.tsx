import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getCommunications, deleteCommunicationById } from 'apiSdk/communications';
import { CommunicationInterface } from 'interfaces/communication';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function CommunicationListPage() {
  const { data, error, isLoading, mutate } = useSWR<CommunicationInterface[]>(
    () => '/communications',
    () =>
      getCommunications({
        relations: ['user_communication_sender_idTouser', 'user_communication_receiver_idTouser'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteCommunicationById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Communication
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/communications/create`}>
          <Button colorScheme="blue" mr="4">
            Create
          </Button>
        </Link>
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Message</Th>
                  <Th>Sender</Th>
                  <Th>Receiver</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.message}</Td>
                    <Td>
                      <Link href={`/users/view/${record.user_communication_sender_idTouser?.id}`}>
                        {record.user_communication_sender_idTouser?.role}
                      </Link>
                    </Td>
                    <Td>
                      <Link href={`/users/view/${record.user_communication_receiver_idTouser?.id}`}>
                        {record.user_communication_receiver_idTouser?.role}
                      </Link>
                    </Td>

                    <Td>
                      <Link href={`/communications/edit/${record.id}`} passHref legacyBehavior>
                        <Button as="a">Edit</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Link href={`/communications/view/${record.id}`} passHref legacyBehavior>
                        <Button as="a">View</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'communication',
  operation: AccessOperationEnum.READ,
})(CommunicationListPage);
