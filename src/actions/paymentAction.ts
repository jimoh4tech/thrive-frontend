import axios from 'src/utils/axios';

export const initiatePayment = ({ amount, split_code }: { amount: number; split_code?: string }) =>
  axios.post('/users/transaction', { amount, split_code });

export const verifyPayment = (
  url: string
): Promise<{
  data: {
    id: number;
    reference: string;
    amount: string;
    authorizationUrl: string;
    status: string;
  };
}> => axios.post(url);
