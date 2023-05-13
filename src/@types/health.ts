export type IHeath = {
  id: number;
  name: string;
  isPlatinum: boolean | null;
  url: string | null;
  cover: string;
  description: string;
  category: any;
  institution: any;
  services: any;

  createdAt: string;
  updatedAt: string;
};

export type IHeathFilter = {
  institution: string[];
  category: string;
  type: string;
  sortBy: string;
};
