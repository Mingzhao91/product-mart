export interface User {
  id: string;
  email: string;
  fullname: string;
  password: string;
  roles?: { type: string }[];
}
