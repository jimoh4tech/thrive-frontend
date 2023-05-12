import axiosInstance from 'src/utils/axios';

const endpoints = {
  user: '/users',
  business: '/users/business',
  media: '/business-media',
  mediaCats: '/business-media/categories',
  template: '/business-template',
  templateCats: '/business-template/categories',
  events: '/events',
  eventsCats: '/events/categories',
  eventsOrganizers: '/events/organizers',
  finance: '/finance/services',
  financeCats: '/finance/categories',
  financeInstitutions: '/finance/institutions',
};

export const fetcher = async (url: string) => (await axiosInstance.get(url)).data;

export const loader = async (model: keyof typeof endpoints, data?: any) =>
  (await axiosInstance.get(endpoints[model], data)).data;

export const updater = async (model: keyof typeof endpoints, data: any) =>
  (await axiosInstance.put(endpoints[model], data)).data;

export const creator = async (model: keyof typeof endpoints, data: any) =>
  (await axiosInstance.post(endpoints[model], data)).data;
