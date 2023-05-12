import axiosInstance from 'src/utils/axios';

export const approveUser = async (data: { icssId: string; id: number }) =>
  axiosInstance.patch(`/admin/users/approve/${data.id}`, data);
