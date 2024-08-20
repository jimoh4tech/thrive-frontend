import axiosInstance from 'src/utils/axios';

export const approveUser = async (data: { id: number }) =>
  axiosInstance.patch(`/admin/users/approve/${data.id}`, data);

export const declineUser = async (id: number) => axiosInstance.patch(`/admin/users/decline/${id}`);
export const suspendUser = async (id: number) => axiosInstance.patch(`/admin/users/suspend/${id}`);
export const viewUser = async (id: number) => axiosInstance.get(`/admin/users/${id}`);

export const deleteBusinessBox = async (id: number) =>
  axiosInstance.delete(`/business-template/${id}`);

export const deleteBusinessMedia = async (id: number) =>
  axiosInstance.delete(`/business-media/${id}`);
