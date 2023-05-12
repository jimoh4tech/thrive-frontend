import axios from 'src/utils/axios';
// Register User
export const virtualOfficeApply = async (data: any) => axios.post('/virtual-office', data);
