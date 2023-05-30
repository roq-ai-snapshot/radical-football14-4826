import AppLayout from 'layout/app-layout';
import { Box, Spinner, Flex } from '@chakra-ui/react';
import useSWR, { Fetcher } from 'swr';
import UserProfile from 'components/user-profile';

interface UserProfile {
  id: string;
  reference: string;
  firstName?: string | null;
  lastName?: string | null;
}

interface UsersFetchResponse {
  data: UserProfile[];
  totalCount: number;
}

export default function UsersPage() {
  const fetcher: Fetcher<UsersFetchResponse> = (apiURL: string) => fetch(apiURL).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

  return (
    <AppLayout>
      <Flex justifyContent={'center'} wrap="wrap" gap={5}>
        {isLoading ? <Spinner size="lg" color="cyan.500" /> : <></>}
        {data?.data?.map((u) => (
          <UserProfile key={u.id} firstName={u.firstName} lastName={u.lastName} reference={u.reference} id={u.id} />
        ))}
      </Flex>
    </AppLayout>
  );
}
