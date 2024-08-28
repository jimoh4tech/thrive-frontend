import axios from 'src/utils/axios';

export const initiatePayment = ({ amount, plan }: { amount: number; plan?: string }) =>
  axios.post('/users/transaction', { amount, plan });

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
