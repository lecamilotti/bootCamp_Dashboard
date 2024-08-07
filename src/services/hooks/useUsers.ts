// src/services/hooks/useUsers.ts
import { useQuery } from 'react-query';
import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('/api/users'); // Ensure the endpoint is correct
  console.log(data);

  const users = data.users.map((user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('en-UK', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return users;
}

export function useUsers(page: number, p0: { initialData: any; }) {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // 5 seconds
  });
}
