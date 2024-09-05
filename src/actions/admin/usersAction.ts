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

export const deleteEvent = async (id: number) => axiosInstance.delete(`/events/${id}`);

export const applyForEvent = async (id: number) => axiosInstance.post(`/events/${id}/apply`);

export const deleteFinance = async (id: number) => axiosInstance.delete(`/finance/${id}`);

export const applyForFinance = async (id: number) =>
  axiosInstance.post(`/finance/services/${id}/apply`);

export const deleteHealth = async (id: number) => axiosInstance.delete(`/health/${id}`);

export const applyForHealth = async (id: number) =>
  axiosInstance.post(`/health/services/${id}/apply`);
