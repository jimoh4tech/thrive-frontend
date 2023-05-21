export type IMedia = {
  id: number;
  name: string;
  description: string;
  isPlatinum: boolean;
  mediaUrl: string;
  format: string;

  metadata: { bytes: number };
  category: { name: string };

  createdAt: string;
  updatedAt: string;
};

export type IMediaFilter = {
  institution: string[];
  category: string;
  type: string;
  sortBy: string;
};
