import { UserCreate } from 'src/auth/types';
import axios from 'src/utils/axios';

// REQUEST VERIFY EMAIL
export const requestVerifyEmail = async (
  email: string,
  requestType?: 'register' | 'reset-password'
): Promise<{ verifyToken: string }> => {
  const res = await axios.post('/users/request-verify-email-code', {
    email,
    requestType,
  });

  return res.data;
};

// VERIFY EMAIL
export const verifyEmail = async (data: {
  email: string;
  code: string;
  verifyToken: string;
}): Promise<{ emailVerifiedToken: string }> => {
  const res = await axios.post('/users/verify-email-code', data);

  return res.data;
};

// Register User
export const register = async (data: UserCreate) => {
  const response = await axios.post('/users/signup', data);
  const { accessToken } = response.data;

  localStorage.setItem('accessToken', accessToken);
};
