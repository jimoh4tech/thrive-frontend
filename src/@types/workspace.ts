export interface IWorkspaceQuery {
  city?: string;
  category?: string;
  capacity?: number;
  page?: number;
}

export interface IWorkspace {
  id: string;
  title: string;
  capacity: number;
  category_details: string;
  avg_rating: string;
  booking_duration: {
    amount: number;
    minimum_duration: string;
  }[];
  images: {
    header: string;
  };
  workspace_details: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  rating: {
    rating_value: number;
    total_reviews: number;
  };
}

export interface IWorkspaceResData<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
