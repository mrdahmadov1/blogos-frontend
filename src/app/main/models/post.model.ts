import { User } from './user.model';

export interface Post {
  _id: string;
  user: User;
  title: string;
  content: string;
  createdAt: string;
  id: string;
}

export interface PostsResponse {
  status: string;
  results: number;
  data: Post[];
}
