import axios from 'axios';
import { IQuery } from 'src/@types/query';
import axiosInstance from 'src/utils/axios';

const endpoints = {
  user: '/users',
  userBusiness: '/users/business',
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
  healthCats: '/health/categories',
  healthInstitutions: '/health/institutions',
  mediaLibrary: '/business-media/library',
  templateLibrary: '/business-template/library',
  businesses: '/directory-listing',
  health: '/health/institutions',
};

const customEndpoints = {
  workSpaceCat: 'https://api.workhopper.org/listings_categories',
  workspace: 'https://api.workhopper.org/listings',
};

export const fetcher = async (url: string) => (await axiosInstance.get(url)).data;

export const loader = async (model: keyof typeof endpoints, params: IQuery = {}) =>
  (await axiosInstance.get(endpoints[model], { params })).data;

export const updater = async (model: keyof typeof endpoints, data: any) =>
  (await axiosInstance.put(endpoints[model], data)).data;

export const creator = async (model: keyof typeof endpoints, data: any) =>
  (await axiosInstance.post(endpoints[model], data)).data;

export const download = async (fileUrl: string) =>
  axiosInstance.get(fileUrl, {
    headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment' },
  });

export const customLoader = async (model: keyof typeof customEndpoints, params: any = {}) =>
  (await axios.get(customEndpoints[model], { params })).data;
