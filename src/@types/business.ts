export type IUserBusiness = {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsappNumber: string | null;
  country: string | null;
  address: string;
  state: string;
  industryId: number;
  industry: IIndustry | null;
  designation: string;
  bio: string | null;
  cac: string;
  cover: string;
  logo: string;
  govId: string;
  slug: string;
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;

  createdAt: string;
  updatedAt: string;
};

export type IIndustry = {
  name: string;
  id: number;
};
