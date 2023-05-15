export type IHealth = {
  id: number;
  name: string;
  isPlatinum: boolean | null;
  url: string | null;
  cover?: string;
  logo?: string;
  description: string;
  category: any;
  institution: any;
  services: any;

  createdAt: string;
  updatedAt: string;
};

export type IHealthFilter = {
  institution: string[];
  category: string;
  type: string;
  sortBy: string;
};
