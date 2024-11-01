import { CustomFile } from '../components/upload';

// ----------------------------------------------------------------------

export type IBlogPostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date;
  users: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  replyComment: {
    id: string;
    userId: string;
    message: string;
    postedAt: Date;
    tagUser?: string;
  }[];
};

export type IBlogNewPost = {
  title: string;
  description: string;
  content: string;
  cover: CustomFile | string | null;
  tags: string[];
  publish: boolean;
  comments: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
};

export type IBlogPost = {
  id: number;
  title: string;
  body: string;
  image: string;
  comment: number;
  like: number;
  tags: string[];
  createdAt: string;
  href?: string;
};
