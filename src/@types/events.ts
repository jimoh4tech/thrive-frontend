export type IEvent = {
  id: number;
  name: string;
  amount: number;
  discout: number | null;
  discountType: string | null;
  isPlatinum: boolean | null;
  url: string | null;
  cover: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  location: string;
  category: any;
  organizer: any;

  createdAt: Date | null;
  updatedAt: Date | null;
};

export type IEventFilter = {
  organizers: string[];
  category: string;
  priceRange: number[];
  type: string;
  sortBy: string;
};
