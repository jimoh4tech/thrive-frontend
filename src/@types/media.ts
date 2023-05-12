export type IMedia = {
  id: number;
  name: string;
  description: string;
  isPlatinum: boolean;
  mediaUrl: string;
  format: string;
  category: any;

  createdAt: string;
  updatedAt: string;
};

export type IMediaFilter = {
  institution: string[];
  category: string;
  type: string;
  sortBy: string;
};
