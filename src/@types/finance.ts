export type IFinance = {
  id: number;
  name: string;
  isPlatinum: boolean | null;
  url: string | null;
  cover: string;
  description: string;
  category: any;
  institution: any;

  createdAt: string;
  updatedAt: string;
};

export type IFinanceFilter = {
  institution: string[];
  category: string;
  type: string;
  sortBy: string;
};
