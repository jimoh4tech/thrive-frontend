import axios from 'src/utils/axios';
// Register User
export const createBusiness = async (data: any) => axios.post('/users/business', data);
