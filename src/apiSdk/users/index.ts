import axios from 'axios';
import queryString from 'query-string';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from '../../interfaces';

export const getUsers = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUser = async (user: UserInterface) => {
  const response = await axios.post('/api/users', user);
  return response.data;
};

export const updateUserById = async (id: string, user: UserInterface) => {
  const response = await axios.put(`/api/users/${id}`, user);
  return response.data;
};

export const getUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserById = async (id: string) => {
  const response = await axios.delete(`/api/users/${id}`);
  return response.data;
};
