import { AxiosResponse } from 'axios';

export interface IQuery {
  q?: string;
  cat?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
  filterBy?: string;
  filter?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IResDataMany<T> {
  records: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface AxiosRes extends AxiosResponse<IResDataMany<any>> {}
