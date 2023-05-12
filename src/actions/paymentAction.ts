import axios from 'src/utils/axios';

export const initiatePayment = (amount: number) => axios.post('/users/transaction', { amount });

export const verifyPayment = (
  url: string
): Promise<{
  id: number;
  reference: string;
  amount: string;
  authorizationUrl: string;
  status: string;
}> => axios.post(url);
