export interface LoginInput {
  email: string;
  password: string;
}

export interface UserRecord {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
