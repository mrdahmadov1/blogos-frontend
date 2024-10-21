export interface User {
  _id: string;
  name: string;
  email?: string;
  role?: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UsersResponse {
  status: string;
  results: number;
  data: User[];
}
